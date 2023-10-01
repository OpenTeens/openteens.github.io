/* require a `jieba_dict` */

function process(query) {
    // step 1: replace all punctuations with space
    var punctuations = /[,\.\/\?<>;:\'\"\\\|\[\]\{\}\(\)!@\#\$%\^\&\*~`\-_—=\+，。！？；：‘’“”【】《》〈〉、]/g
    query = query.replaceAll(punctuations, " ");
    // step 2: split with space
    query = query.split(" ");
    // step 3: split with jieba
    for (var i = 0; i < query.length; i++) {
        query[i] = jieba.cut(query[i]);
    }
    // step 4: flatten the array
    query = query.flat();
    return query;
}

async function revidx(query) {
    var rev_index = JSON.parse(await HTTP_GET2("/search/index.json"));
    var content = {};	// 记录每个文件的内容
    var file = {};		// 记录每个文件里关键词的信息，indexed by filename
    var filecnt = {};	// 计算每个文件匹配的关键词数量，indexed by filename
    var filematch = {};	// 记录每个文件匹配的关键词，indexed by filename
    query.forEach(kw => {
        if (rev_index[kw]) {
            rev_index[kw][0].forEach(doc => {
                var [filename, info] = doc;
                // 记录到file
                file[filename] = file[filename] || {};
                file[filename][kw] = info;
                // 计算到filecnt
                filecnt[filename] = filecnt[filename] || 0;
                filecnt[filename]++;
                // 记录到filematch
                filematch[filename] = filematch[filename] || [];
                filematch[filename].push(kw);
            })
        }
    })
    // 获取每个文件的内容
    for (var filename in file) {
        content[filename] = await HTTP_GET2("/search/text/" + filename);
    }
    console.log(JSON.stringify(content));
    console.log(JSON.stringify(file));
    console.log(JSON.stringify(filecnt));
    console.log(JSON.stringify(filematch));

    // 处理连续的关键词
    var multi_keywords = {};    // indexed by 连续的关键词个数
    // for each files
    for(var fname in file){
        var all_kws = [];   // each = [word, start, end, cnt], where cnt is "合并的关键词个数(merged cnt)"
        let kws = file[fname];
        // init list
        for(let k in kws){
            let [cnt, pos] = kws[k];
            pos.forEach(p => {
                all_kws.push([k, p, p + k.length, 1]);
            })
        }
        // process
        all_kws.sort((a, b) => a[1] - b[1]);    // sort by `start`, small first.
        for(var i = 0; i < all_kws.length - 1; i++){
            var a = all_kws[i], b = all_kws[i+1];
            if (b[1] - a[2] < MULTIKW_MAX_SPACE){
                // 挨在一起的两个关键词
                var merged = [`${a[0]} ${b[0]}`, a[1], b[2], a[3]+b[3]];
                all_kws.splice(i+1, 1);
                all_kws[i] = merged;
                i--;
            }
        }
        all_kws.sort((a, b) => b[3] - a[3]);    // sort by `merged cnt`, big first.
        var most = all_kws[0];
        multi_keywords[most[3]] = multi_keywords[most[3]] || [];
        var left_bound = Math.max(most[1]-50, 0);
        var right_bound = Math.min(most[2]+50, content[fname].length);
        multi_keywords[most[3]].push([fname, left_bound, right_bound, [[most[1], most[2]]]]);  // format as `result_range`
    }
    // merge `multi_keywords` into `result_range`
    var result_range = [];  // each item = [filename, pos_start, pos_end, [[hl1_s, hl1_e], [hl2_s, hl2_e]]]
    var kwcnts = Object.keys(multi_keywords).reverse();
    kwcnts.forEach(kwcnt => {   // 连续的关键词个数
        multi_keywords[kwcnt].forEach(doc => {
            result_range.push(doc);
        })
    })
    result_range.flat();    // flatten
    console.log(JSON.stringify(result_range))

    // compile to HTML
    var result_content = [];	// each item = [filename, HTML]
    result_range.forEach(r => {
        let [fname, pos_start, pos_end, hl] = r;
        hl = hl.sort((a, b) => b[0] - a[0]);	// max first
        var c = content[fname].substring(pos_start, pos_end);
        // highlight
        hl.forEach(h => {
            // console.log(1, c);
            c = c.substring(0, h[0] - pos_start) + "<b>" + c.substring(h[0] - pos_start, h[1] - pos_start) + "</b>" + c.substring(h[1] - pos_start);
            // console.log(2, c);
        })
        result_content.push([fname, c]);
    })
    return result_content;
}

async function jb(dictionary) {
    var trie = {}, // to be initialized
        FREQ = {},
        total = 0.0,
        min_freq = 0.0,
        initialized = false;

    var max_of_array = function (array) { return Math.max.apply(Math, array) },
        min_of_array = function (array) { return Math.min.apply(Math, array) };

    var gen_trie = function () {
        var lfreq = {},
            trie = {},
            ltotal = 0.0;

        for (var i = 0; i < dictionary.length; i++) {
            var entry = dictionary[i],
                word = entry[0],
                freq = entry[1];
            lfreq[word] = freq;
            ltotal += freq;
            p = trie;
            for (var ci = 0; ci < word.length; ci++) {
                var c = word[ci];
                if (!(c in p)) {
                    p[c] = {};
                }
                p = p[c];
            }
            p[''] = ''; // ending flag
        }

        return [trie, lfreq, ltotal];
    }

    var initialize = function () {
        if (initialized === true) {
            return;
        }
        if (trie) {
            trie = {};
        }
        // console.log("Building Trie...");

        var gar = gen_trie();
        trie = gar[0];
        FREQ = gar[1];
        total = gar[2];

        var min_freq = Infinity;
        // normalize:
        for (k in FREQ) {
            var v = FREQ[k];
            FREQ[k] = Math.log(v / total);
            if (FREQ[k] < min_freq) {
                min_freq = FREQ[k];
            }
        }
        initialized = true;

        // console.log("Trie built!", trie);
    }

    var get_DAG = function (sentence) {
        var N = sentence.length,
            i = 0,
            j = 0,
            p = trie,
            DAG = {};

        while (i < N) {
            var c = sentence[j];
            if (c in p) {
                p = p[c];
                if ('' in p) {
                    if (!(i in DAG)) {
                        DAG[i] = [];
                    }
                    DAG[i].push(j);
                }
                j += 1;
                if (j >= N) {
                    i += 1;
                    j = i;
                    p = trie;
                }
            }
            else {
                p = trie;
                i += 1;
                j = i;
            }
        }
        for (i = 0; i < sentence.length; i++) {
            if (!(i in DAG)) {
                DAG[i] = [i];
            }
        }
        return DAG;
    }

    var calc = function (sentence, DAG, idx, route) {
        var N = sentence.length;
        route[N] = [0.0, ''];
        for (idx = N - 1; idx > -1; idx--) {
            candidates = [];
            candidates_x = [];
            for (xi in DAG[idx]) {
                var x = DAG[idx][xi];
                var f = ((sentence.substring(idx, x + 1) in FREQ) ? FREQ[sentence.substring(idx, x + 1)] : min_freq);
                candidates.push(f + route[x + 1][0]);
                candidates_x.push(x);
            }
            var m = max_of_array(candidates);
            // console.log('max is', m);
            route[idx] = [m, candidates_x[candidates.indexOf(m)]];
        }
    }

    var __cut_DAG = function (sentence) {
        // finalseg is still to be implemented,
        // so this is also unfinished. Use __cut_DAG_NO_HMM
        // for now

        var DAG = get_DAG(sentence);
        var route = {};
        var yieldValues = [];

        calc(sentence, DAG, 0, route);

        var x = 0,
            buf = '',
            N = sentence.length;

        while (x < N) {
            var y = route[x][1] + 1,
                l_word = sentence.substring(x, y);
            if (y - x == 1) {
                buf += l_word;
            }
            else {
                if (buf.length > 0) {
                    if (buf.length == 1) {
                        yieldValues.push(buf);
                    }
                    else {
                        if (!(buf in FREQ)) {
                            var recognized = finalseg.cut(buf);
                            for (t in recognized) {
                                yieldValues.push(recognized[t]);
                            }
                        }
                        else {
                            for (elem in buf) {
                                yieldValues.push(buf[elem]);
                            }
                        }
                        buf = "";
                    }
                }
                yieldValues.push(l_word);
            }
            x = y;
        }


        if (buf.length > 0) {
            if (buf.length == 1) {
                yieldValues.push(buf);
            }
            else {
                if (!(buf in FREQ)) {
                    var recognized = finalseg.cut(buf);
                    for (t in recognized) {
                        yieldValues.push(recognized[t]);
                    }
                }
                else {
                    for (elem in buf) {
                        yieldValues.push(buf[elem]);
                    }
                }
            }
        }
        return yieldValues;
    }

    var __cut_DAG_NO_HMM = function (sentence) {
        var re_eng = /[a-zA-Z0-9]/,
            route = {},
            yieldValues = [];

        var DAG = get_DAG(sentence);
        // console.log("DAG", DAG);
        calc(sentence, DAG, 0, route);

        // console.log(route);

        var x = 0,
            buf = '',
            N = sentence.length;

        while (x < N) {
            y = route[x][1] + 1;
            l_word = sentence.substring(x, y);
            // console.log(l_word, l_word.match(re_eng))
            if (l_word.match(re_eng) && l_word.length == 1) {
                buf += l_word;
                x = y;
            }
            else {
                if (buf.length > 0) {
                    yieldValues.push(buf);
                    buf = '';
                }
                yieldValues.push(l_word);
                x = y;
            }
        }
        if (buf.length > 0) {
            yieldValues.push(buf);
            buf = '';
        }
        return yieldValues;
    }

    var cut = function (sentence) {
        var cut_all = false,
            HMM = false,
            yieldValues = [];

        var re_han = /([\u4E00-\u9FA5a-zA-Z0-9+#&\._]+)/,
            re_skip = /(\r\n|\s)/;

        var blocks = sentence.split(re_han);
        var cut_block = HMM ? __cut_DAG : __cut_DAG_NO_HMM;

        for (b in blocks) {
            var blk = blocks[b];
            // console.log(b, blk);
            if (blk.length == 0) {
                continue;
            }

            if (blk.match(re_han)) {
                var cutted = cut_block(blk);
                // console.log("matches", cutted);
                for (w in cutted) {
                    var word = cutted[w];
                    yieldValues.push(word);
                }
            }
            else {
                var tmp = blk.split(re_skip);
                for (var i = 0; i < tmp.length; i++) {
                    var x = tmp[i];
                    if (x.match(re_skip)) {
                        yieldValues.push(x);
                    }
                    else if (!cut_all) {
                        for (xi in x) {
                            yieldValues.push(x[xi]);
                        }
                    }
                    else {
                        yieldValues.push(x);
                    }
                }
            }
        }
        return yieldValues;
    }

    // initialize when the file loads (no lazy-loading yet):
    initialize();

    // window.jieba.cut = cut;
    // window.jieba.ready = true;
    // console.log("Jieba loaded.");
    // window.jieba.onload();

    jieba = {
        cut: cut
    }

    query = decodeURI(query);
    query = process(query); // split query
    var result = await revidx(query);
    // console.log(result)
    var html = [];
    result.forEach(r => {
        r[0] = r[0].substring(0, r[0].length - 9);	// cut '.html.txt'
        html.push(`
            <div class="result">
                <h2><a href="/${r[0]}">${r[0]}</a></h2>
                <p>${r[1]}</p>
            </div>
            `)
    })
    self.postMessage(html.join('<hr>'));
}


function HTTP_GET2(aUrl) {
    // Promise version.
    return new Promise(function (resolve, reject) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4) {
                if (anHttpRequest.status == 200) {
                    resolve(anHttpRequest.responseText);
                } else {
                    reject(new Error('HTTP_GET failed: ' + anHttpRequest.status));
                }
            }
        };

        anHttpRequest.open('GET', aUrl, true);
        anHttpRequest.send(null);
    });
}
function HTTP_GET2(aUrl) {
    // Promise version.
    return new Promise(function (resolve, reject) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4) {
                if (anHttpRequest.status == 200) {
                    resolve(anHttpRequest.responseText);
                } else {
                    reject(new Error('HTTP_GET failed: ' + anHttpRequest.status));
                }
            }
        };

        anHttpRequest.open('GET', aUrl, true);
        anHttpRequest.send(null);
    });
}

self.onmessage = function(e) {
    query = e.data;
    jb(jieba_dict);
}


// settings & vars

var query = "";
var jieba = {};
const MULTIKW_MAX_SPACE = 4;
