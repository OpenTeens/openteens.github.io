import os
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait


def replace_punctuations(s):
    # Replace all Non-character and Non-number characters and Non-chinese with space
    s = re.sub(r'[^,\.\/\?<>;:\'\"\\\|\[\]\{\}\(\)!@\#\$%\^\&\*~`\-_—=\+，。！？；：‘’“”【】《》〈〉、\w\s\u4e00-\u9fff]+', ' ', s)
    return s


def fetch_all():
    print(" [*] Fetching all pages ...")
    os.chdir('pages')
    browser = webdriver.Edge()
    try:
        for filename in os.listdir():
            if (os.path.isdir(filename) or filename in ['search.html', '404.html.html']):
                continue

            curr_dir = os.getcwd().replace("\\", "/")
            url = f"file://{curr_dir}/{filename}"
            print(f"  - Fetching {url} ... ", end='')
            browser.get(url)
            content = browser.execute_script("return document.body.innerText")

            content = replace_punctuations(content) # Remove punctuations
            content = re.sub(r'\s{0,10}\n\s{0,10}', '\uffff', content)   # Remove multiple newlines
            content = content.strip() # Remove leading and trailing spaces and newlines
            content = re.sub(r'\s+', ' ', content)  # Remove extra spaces

            with open(f"{curr_dir}/../search/text/{filename}.txt", 'w') as f:
                f.write(content)
            print("Done.")
    finally:
        print("  - Closing browser ... ", end='')
        browser.close()
        os.chdir('..')
        print("Done.")
        print('\n')


if __name__ == '__main__':
    fetch_all()
