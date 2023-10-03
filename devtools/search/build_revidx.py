import os
import re
import string
import jieba


def contains_chinese(text):
    pattern = re.compile(r'[\u4e00-\u9fff]+')
    return bool(pattern.search(text))


def replace_punctuations(s):
    # Replace all Chinese and English punctuations with underscores
    for c in string.punctuation + '，。！？；：‘’“”【】《》〈〉、':
        s = s.replace(c, ' ')
    return s


def build_index(directory):
    index = {}
    for root, dirs, files in os.walk(directory):
        # iterate through all files in the directory
        for file in files:
            if file.endswith(".txt"):
                path = os.path.join(root, file)
                with open(path, "r") as f:
                    # read the file
                    """
                    What to do with a document line:
                    1. replace all punctuations with spaces
                    2. split the line into words by spaces
                    3. use jieba to cut up
                    """
                    local_index = dict()
                    for line_num, line in enumerate(f):
                        line = replace_punctuations(
                            line.strip())    # replace punctuations
                        # cut up the line into words
                        words = jieba.cut_for_search(line.strip())
                        # delete space
                        words = [word for word in words if word != ' ']
                        # add each word to the local_index
                        for word in words:
                            if word not in local_index:
                                local_index[word.lower()] = [0, []]
                                wordpos = line.index(word)
                            else:
                                word_count, word_pos = local_index[word]
                                wordpos = line.index(word, word_pos[-1]+1)
                            local_index[word.lower()][0] += 1
                            local_index[word.lower()][1].append(wordpos)
                    # merge local index to global index
                    for word in local_index:
                        if word not in index:
                            index[word] = []
                        index[word].append((file, local_index[word]))

    return index


if __name__ == '__main__':
    print(" [*] Building reverse index ... ")
    index = build_index("search/text")
    with open("search/index.txt", "w") as f:
        for word in sorted(index.keys()):
            print(index[word])
            f.write(f"{word}: {index[word]}\n")
