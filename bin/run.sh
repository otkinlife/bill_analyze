#!/bin/bash

workPath="/Users/kcjia/Library/Mobile\ Documents/com\~apple\~CloudDocs/账单/bill_render"

cd $workPath
echo "启动服务.."
nohup ./server &
ehcho "启动完成"
open -a "/Applications/Safari.app" "http://localhost:8999"