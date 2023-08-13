mkdir ..\_tmp
xcopy * ..\_tmp /E /EXCLUDE:.upload_ignor

scp -i "C:\Users\BernieHuang\desktop\temp\31415.pem" -r "../_tmp" ubuntu@20.214.186.77:/home/ubuntu/scp_tmp
rmdir ..\_tmp /S /Q

ssh -i "C:\Users\BernieHuang\desktop\temp\31415.pem" ubuntu@20.214.186.77 "./update_website.sh" 
