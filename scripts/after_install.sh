#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/CSC-SWE-Group3/deploy.log

echo 'cd /home/ec2-user/CSC-SWE-Group3' >> /home/ec2-user/CSC-SWE-Group3/deploy.log
cd /home/ec2-user/CSC-SWE-Group3 >> /home/ec2-user/CSC-SWE-Group3/deploy.log

echo 'npm install' >> /home/ec2-user/CSC-SWE-Group3/deploy.log 
npm install >> /home/ec2-user/CSC-SWE-Group3/deploy.log
