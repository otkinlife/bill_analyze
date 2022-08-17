package main

import (
	"encoding/json"
	"time"
)

type Row struct {
	Date   string `json:"date"`
	IO     string `json:"io"`
	Type   string `json:"type"`
	Amount string `json:"amount"`
	Note   string `json:"note"`
}

type BillData struct {
	rows      []Row
	monthData map[int][]Row
}

func NewBillClient(content []byte) *BillData {
	var rows []Row
	json.Unmarshal(content, &rows)
	res := &BillData{
		rows: rows,
	}
	res.doMonthRows()
	return res
}

func (b *BillData) doMonthRows() {
	b.monthData = map[int][]Row{}
	for _, v := range b.rows {
		t, err := time.ParseInLocation("2006-01-02 15:04:05", v.Date, time.Local)
		if err != nil {
			return
		}
		m := t.Month()
		b.monthData[int(m)] = append(b.monthData[int(m)], v)
	}
}

func (b *BillData) GetMonthRows(month int) *[]Row {
	if v, ok := b.monthData[month]; ok {
		return &v
	}
	return nil
}

func (b *BillData) GetAllRows() *[]Row {
	return &b.rows
}
