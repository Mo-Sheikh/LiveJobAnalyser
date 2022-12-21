#!/bin/bash
sudo su &&
echo "Updating" && 
sudo yum update httpd &&
echo "*** Installing httpd" &&
sudo yum install httpd &&
echo "*** Completed Installing httpd" &&
sudo systemctl start httpd 