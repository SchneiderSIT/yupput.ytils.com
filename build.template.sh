#!/bin/sh

./build/application.jsmrg.ytils.com ytils.yupput.js ytils.yupput-<version>.js
ftp -n < ./upload.yupput-out.ftp.txt