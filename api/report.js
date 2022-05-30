
export const handleReportPost = function (
    description,
    level,
    latitude,
    longitude,
    tag_id,
) {
    var dataToSend = {
        desc: description,
        level: level,
        location_lat: latitude,
        location_long: longitude,
        tag_id: tag_id,
    };
    var formBody = [];
    for (var data in dataToSend) {
        var encodedKey = encodeURIComponent(data);
        var encodedValue = encodeURIComponent(dataToSend[data]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch("http://192.168.1.54:3000/api/report", {
            method: "POST",
            body: formBody,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then(response => {
            return response.json();
        }).then(json => {
            switch (json.res) {
                case 1:
                    console.log('report ok');
            }
        })
        .catch((err) => console.log(err));
};


