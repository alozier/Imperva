const fetchResponses = fetch('categorized_domain_requests.json');

fetchResponses.then(response => { 
    return response.json();
}).then(domRequests => {
    const human_requests = domRequests.categorized_domain_requests.map(human => human.human_total);
    const good_bot_requests = domRequests.categorized_domain_requests.map(goodBot => goodBot.good_bot_total);
    const bad_bot_requests = domRequests.categorized_domain_requests.map(badBot => badBot.bad_bot_total);
    const whitelist_requests = domRequests.categorized_domain_requests.map(whitelist => whitelist.whitelist_total);
    const dates = domRequests.categorized_domain_requests.map(dates => dates.summary_date);
    $(function () {
        $('#container').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                text: 'Requests'
            },
            xAxis: {
                categories: dates,
                title: {
                    text: 'Date'
                }
            },
            yAxis: {
                title: {
                    text: 'Total Requests'
                }
            },
            series: [{
                name: 'Human',
                data: human_requests
            }, {
                name: 'Good Bot',
                data: good_bot_requests
            }, {
                name: 'Bad Bot',
                data: bad_bot_requests
            }, { 
                name: 'Whitelist',
                data: whitelist_requests
            }],
        });
        $('#submitButton').click(function(){
            const chart = $('#container').highcharts();
            const botSeries = document.querySelector('input[name="reqType"]:checked').id;
            const dateValue = $('#dates').val();
            const reqNumber = parseInt($('#reqNumber').val());
        
            chart.series[botSeries].addPoint([ dateValue, reqNumber ]);
        });
    
    });
});

