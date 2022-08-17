let yCount = 0
let yData = []
let BillObj = {};
function getData() {
    yCount = 0
    yData = []
    BillObj = {}
    $.ajax({
        url : "http://localhost:8999/content?y="+selectYear + "&m=" + selectMonth,
        type : "get",
        async : false,
        dataType: "json",
        success :  function (data) {
            if (data.ErrNo !== 0) {
                alert(data.Data)
            }
            yData = data.Data
            $.each(data.Data, function (k, v) {
                if (BillObj[v.type] == null) {
                    BillObj[v.type] = 0
                }
                yCount += Number(v.amount) * 100
                BillObj[v.type] += Number(v.amount) * 100
            })
        }
    })
}

function loadYearList() {
    $.ajax({
        url : "http://localhost:8999/list",
        type : "get",
        async : false,
        dataType: "json",
        success :  function (data) {
            if (data.ErrNo !== 0) {
                alert(data.Data)
            }
            $.each(data.Data, function (k, v) {
                $('#y-list').append("<li><a class=\"dropdown-item\" href=\"#\">"+v+"</a></li>")
            })
        }
    })
}
$(function (){
    $('#y-list').find('li').click(function () {
        selectYear =  $(this).children('a').html()
        $('#nav-y').html(selectYear)
        getData()
        bzt()
        zzt()
        $('#gl_amount').html('消费总计：'+ yCount / 100 + '元')
        if (selectMonth === ''){
            $('#gl_time').html('时间：'+ selectYear + '年')
        } else {
            $('#gl_time').html('时间：'+ selectYear + '年' + selectMonth + '月')
        }
    })
    $('#m-list').find('li').click(function () {
        selectMonth = $(this).children('a').html().replace('月', '')
        if (selectMonth !== '全年') {
            $('#nav-m').html(selectMonth + '月')
        } else {
            $('#nav-m').html('全年')
            selectMonth = ''
        }
        getData()
        bzt()
        zzt()
        $('#gl_amount').html('消费总计：'+ yCount / 100 + '元')
        if (selectMonth === ''){
            $('#gl_time').html('时间：'+ selectYear + '年')
        } else {
            $('#gl_time').html('时间：'+ selectYear + '年' + selectMonth + '月')
        }
    })
})
