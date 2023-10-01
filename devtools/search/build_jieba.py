import jieba
import jieba.posseg as psg


def get_info(word):
    # 提取指定词的词频、词性
    # 返回值：(word, 词频, 词性)
    freq = jieba.get_FREQ(word) or 0
    pos = psg.lcut(word)[0].flag
    return word, freq, pos


def main():
    print(" [*] Building jieba dict ...")
    jieba_dict = []
    with open("search\\index.txt") as f:
        for line in f:
            word = line.split(':')[0].strip()
            word, freq, pos = get_info(word)
            jieba_dict.append([word, freq, pos])

    with open("search\\search.js", "w") as f:
        f.write("var jieba_dict = [")
        for word, freq, pos in jieba_dict:
            f.write(f"['{word}',{freq},'{pos}'],")
        f.write("];\n")
        with open("devtools\\search\\search.js.template.js") as template:
            for line in template.readlines():
                f.write(line)


if __name__ == "__main__":
    main()
