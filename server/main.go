package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"
)

const dataPath = "../data"

func main() {
	http.HandleFunc("/list", getList)
	http.HandleFunc("/content", getContent)
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("../static"))))
	fmt.Println("server_mac start at port 8999")
	err := http.ListenAndServe(":8999", nil)
	if err != nil {
		os.Exit(1)
	}
}

type Resp struct {
	ErrNo int
	Data  interface{}
}

func getList(w http.ResponseWriter, req *http.Request) {
	setupCORS(&w)
	resp := new(Resp)

	defer func() {
		resString, _ := json.Marshal(resp)
		_, _ = w.Write(resString)
	}()

	fileList, err := ioutil.ReadDir(dataPath)
	if err != nil {
		resp.ErrNo = 1
		resp.Data = fmt.Sprintln(err)
		return
	}
	var list []string
	for _, v := range fileList {
		t := strings.Replace(v.Name(), "plutus-", "", 1)
		t = strings.Replace(t, ".json", "", 1)
		list = append(list, t)
	}
	if len(list) > 0 {
		resp.Data = list
	}
}

func getContent(w http.ResponseWriter, req *http.Request) {
	setupCORS(&w)
	resp := new(Resp)
	defer func() {
		resString, _ := json.Marshal(resp)
		_, _ = w.Write(resString)
	}()
	year := req.URL.Query().Get("y")
	month := req.URL.Query().Get("m")
	fileName := dataPath + "/" + "plutus-" + year + ".json"
	content, err := os.ReadFile(fileName)
	if err != nil {
		resp.ErrNo = 1
		resp.Data = fmt.Sprintln(err)
		return
	}
	billClient := NewBillClient(content)
	resp.Data = billClient.rows

	if month != "" {
		m, err := strconv.Atoi(month)
		if err != nil {
			resp.ErrNo = 1
			resp.Data = fmt.Sprintln(err)
			return
		}
		resp.Data = billClient.GetMonthRows(m)
		return
	}
	resp.Data = billClient.GetAllRows()
	return
}

func setupCORS(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}
