#!/bin/bash
cd server

#编译linux可执行文件
go env -w GOOS=linux
go env -w GOARCH=amd64
go build -o ../bin/server_linux

#编译mac可执行文件
go env -w GOOS=darwin
go env -w GOARCH=amd64
go build -o ../bin/server_mac
