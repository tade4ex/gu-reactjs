let ajaxRequestPromiseArray = [];

for (let number = 1; number <= 10; number++) {
    ajaxRequestPromiseArray.push(new Promise((resolve, reject) => {
        let link = `https://jsonplaceholder.typicode.com/users/${number}`;
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    let re = JSON.parse(xmlHttp.responseText);
                    resolve(re);
                } else {
                    reject(`link: ${link}`);
                }
            }
        };
        xmlHttp.open('GET', link);
        xmlHttp.send();
    }));
}

Promise.all(ajaxRequestPromiseArray).then(
    code => {
        console.log('Users:', code);
    },
    error => {
        console.log('error', error);
    }
);