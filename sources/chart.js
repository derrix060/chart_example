var chart = AmCharts.makeChart("chartdiv",
    {
        "type": "serial",
        "theme": "light",
        "categoryField": "date",
        "dataDateFormat": "YYYY-MM-DD",
        "backgroundColor": "#4B0082",
        "decimalSeparator": ",",
        "percentPrecision": 2,
        "thousandsSeparator": ".",
        "categoryAxis": {
            "parseDates": 1
        },
        "chartCursor": {
            "enabled": 1,
            "animationDuration": 0,
            "bulletSize": 3,
            "fullWidth": 1,
            "selectWithoutZooming": 1,
            "valueLineBalloonEnabled": 1,
            "zoomable": 0
        },
        "chartScrollbar": {
            "enabled": 1,
            "autoGridCount": 1,
            "backgroundColor": "#FFFFFF",
            "color": "#000000",
            "dragIcon": "dragIconRectBigBlack",
            "dragIconWidth": 36,
            "graph": "graphMAINA",
            "graphType": "line",
            "gridColor": "#AAB3B3",
            "gridCount": 1,
            "oppositeAxis": 0,
            "scrollbarHeight": 80,
            "selectedColor": "FFFFFF",
            "updateOnReleaseOnly": 1,
            "offset": 50
        },


        "dataLoader":{
            "url": "geral.csv",
            "format": "csv",
            "reverse": 1,
            "async": 1,
            "delimiter": ",",
            "useColumnNames": 1
        },

        
        "graphs": [
            {
                "id": "graphMAINA",
                "lineThickness": 4,
                "title": "MAINA",
                "valueField": "DEC",
                "lineColor": "green",
                "legendPeriodValueText": "[[percents.value.close]]%",
                "legendValueText": "[[percents.value]]%",
                "balloonText": "[[percents.value]]%",
            },
            {
                "id": "graphIBOV",
                "lineThickness": 1,
                "title": "IBOV",
                "valueField": "ibov",
                "lineColor": "red",
                "legendPeriodValueText": "[[percents.value.close]]%",
                "legendValueText": "[[percents.value]]%",
                "balloonText": "[[percents.value]]%",
            },
            {
                "id": "graphCDI",
                "lineThickness": 1,
                "title": "CDI",
                "valueField": "CDI",
                "lineColor": "orange",
                "legendPeriodValueText": "[[percents.value.close]]%",
                "legendValueText": "[[percents.value]]%",
                "balloonText": "[[percents.value]]%",
            },
            {
                "id": "graphUSD",
                "lineThickness": 1,
                "title": "USD",
                "valueField": "usd",
                "lineColor": "black",
                "legendPeriodValueText": "[[percents.value.close]]%",
                "legendValueText": "[[percents.value]]%",
                "balloonText": "[[percents.value]]%",
            }
        ],
        
        "valueAxes": [
            {
                "id": "ValueAxis-1",
                "recalculateToPercents": 1, // or "logarithmic": true
                "title": "",
                "position":"right",
                "gridColor": "#FFFFFF",
            }
        ],
        "legend": {
            "enabled": 1,
            "useGraphSettings": 1,
            "valueWidth": 65,
            "equalWidths": 0
        },
        "listeners":[{
            "event": "rendered",
            "method": return_max
        },{
            "event": "zoomed",
            "method": refreshDateString
        }]
    }
);

function refreshDateString(event){
    document.getElementById("fromDate").value = dateToString(event.startDate);
    document.getElementById("toDate").value = dateToString(event.endDate);
}

function refreshDate(){
    console.log("StartDate: " + chart.startDate);
    console.log("EndDate: " + chart.endDate);

    var fromTxt = document.getElementById("fromDate").value;
    var toTxt = document.getElementById("toDate").value;

    var from = new Date(fromTxt);
    var to = new Date(toTxt);

    chart.zoomToDates(from, to);
}

function dateToString(date){
    return date.toISOString().substring(0, 10);
}

function ytd(){
    var today = new Date(chart.chartData[chart.chartData.length-1].category);

    document.getElementById("toDate").value = dateToString(today);

    var correctDate = new Date(today.getFullYear() -1,11,31);
    var i = 0;
    do{
        i ++;
        var tempDate = new Date(chart.chartData[chart.chartData.length-i].category); 
    }
    while(tempDate.getTime() > correctDate.getTime());

    alert(tempDate);

    document.getElementById("fromDate").value = dateToString(new Date(today.getFullYear() -1,11,30));

    refreshDate();
}

function year(amount){
    var today = new Date(chart.chartData[chart.chartData.length-1].category);

    document.getElementById("toDate").value = dateToString(today);

    today.setFullYear(today.getFullYear() - amount);
    document.getElementById("fromDate").value = dateToString(today);
    
    refreshDate();

}

function return_max(){
    document.getElementById("toDate").value = dateToString(chart.chartData[chart.chartData.length-1].category);
    document.getElementById("fromDate").value = dateToString(chart.chartData[0].category);

    refreshDate();
}

function handleZoom(event) {
   console.log(event)
}

