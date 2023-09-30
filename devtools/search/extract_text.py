import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait


def fetch_all():
    print(" [*] Fetching all pages ...")
    os.chdir('pages')
    browser = webdriver.Edge()
    try:
        for filename in os.listdir():
            if (os.path.isdir(filename)):
                continue

            curr_dir = os.getcwd().replace("\\", "/")
            url = f"file://{curr_dir}/{filename}"
            print(f"  - Fetching {url} ... ", end='')
            browser.get(url)
            content = browser.execute_script("return document.body.innerText")
            with open(f"{curr_dir}/../search/text/{filename}.txt", 'w') as f:
                f.write(content.strip().replace('\n', ' ').replace('  ', ' '))
            print("Done.")
    finally:
        print("  - Closing browser ... ", end='')
        browser.close()
        os.chdir('..')
        print("Done.")
        print('\n')


if __name__ == '__main__':
    fetch_all()

