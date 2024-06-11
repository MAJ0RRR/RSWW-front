import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

# Set up the Chrome driver
driver = webdriver.Chrome()
driver.set_window_size(1920, 1080)

# Open a website
driver.get("http://127.0.0.1:5030/")

# Wait for a few seconds
driver.implicitly_wait(10)

# Days
days_button = driver.find_element(By.XPATH, '/html/body/div/div[2]/div/div[1]/div/div[1]/div[4]/div/button')
days_button.click()

from_days = driver.find_element(By.XPATH, '/html/body/div/div[2]/div/div[1]/div/div[1]/div[4]/div/div/a[1]/div/input')
from_days.clear()
from_days.send_keys('7')

to_days = driver.find_element(By.XPATH, '/html/body/div/div[2]/div/div[1]/div/div[1]/div[4]/div/div/a[2]/div/input')
to_days.clear()
to_days.send_keys('10')

# unclick
days_button.click()

# Num people
people_button = driver.find_element(By.XPATH, '/html/body/div/div[2]/div/div[1]/div/div[2]/div[4]/div/button')
people_button.click()

num_adults = driver.find_element(By.XPATH, '/html/body/div/div[2]/div/div[1]/div/div[2]/div[4]/div/div/a[1]/div/input')
num_adults.clear()
num_adults.send_keys('1')

# unclick
people_button.click()

search_button = driver.find_element(By.XPATH, '/html/body/div/div[2]/div/div[2]/div/button')
search_button.click()

# We are on /search result
first_check_offer_button = driver.find_element(By.XPATH, '/html/body/div/div[3]/div[2]/div[2]/div[2]/div/button')
first_check_offer_button.click()

# Resultdetail page
time.sleep(2)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(2)

add_one_room_button = driver.find_element(By.XPATH,
                                          '/html/body/div/div[2]/div[4]/div[3]/div[4]/div[1]/div[2]/div/div/span/button[1]')
add_one_room_button.click()

reserve_button = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[5]/div[2]/button')
reserve_button.click()

# Login page
username = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/form/div[1]/div/input')
username.send_keys('user7')

password = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/form/div[2]/div/input')
password.send_keys('password7')

login_button = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/form/div[3]/div/button')
login_button.click()

# Result detail page
time.sleep(2)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(2)

reserve_button = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[5]/div[2]/button')
reserve_button.click()

# Reservation page
time.sleep(2)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(2)

buy_button = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[5]/div[2]/button')
buy_button.click()

# Payment page
credit_card_number = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/form/div[1]/div/input')
credit_card_number.send_keys('4111111111111111')

credit_card_expiration = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/form/div[2]/div/input')
credit_card_expiration.send_keys('122025')

credit_card_secure_code = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/form/div[3]/div/input')
credit_card_secure_code.send_keys('456')

pay_button = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/form/div[4]/div/button')
pay_button.click()

while True:
    # Check for payment. If failed retry
    time.sleep(2)
    try:
        pay_button = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/form/div[4]/div/button')
        pay_button.click()

    except NoSuchElementException:
        # If the div is not found, break the loop
        break

driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(2)
span_with_info = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[5]/div[2]/span')
assert span_with_info.text == 'Paid'

print("Test passed")
time.sleep(2)

# Close the browser
driver.quit()
