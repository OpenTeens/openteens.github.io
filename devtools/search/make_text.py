import os
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait


def process_all():
    os.chdir('pages')
    browser = webdriver.Edge()
    try:
        for filename in os.listdir():
            if (os.path.isdir(filename)):
                continue

            curr_dir = os.getcwd().replace("\\", "/")
            url = f"file://{curr_dir}/{filename}"
            browser.get(url)
            content = browser.execute_script("return document.body.innerText")
            with open(f"{curr_dir}/../search/text/{filename}.txt", 'w') as f:
                f.write(content.replace('\n', ' '))
    finally:
        browser.close()


if __name__ == '__main__':
    process_all()
