function toPage(url){
    window.location.href = url;
}

let TempStyls = {};

function readForm(){
    try {
        getData();
    } catch (error) {
        if(error == 'Value error'){
            alert('You missed a spot.');
        }
        //console.log(error);
    }
}

function getData(){
    let elements = document.getElementsByClassName('question_feeld');

    data = {};
    Array.from(elements).forEach(e => {

        if(!TempStyls[e]){
            let borderStyle = e.style.border;
            if(!borderStyle){
                borderStyle = 'none';
            }
            TempStyls[e] = borderStyle;
        }
        switch(e.dataset.type){
            case 'checkbox':
                data[e.dataset.tag] = {};
                let input = e.getElementsByTagName('input');
                let hasValue = false;
                Array.from(input).forEach(x => {
                    hasValue |= x.checked;
                    data[e.dataset.tag][x.dataset.value] = x.checked;
                });
                if(!hasValue){
                    e.style.border = "solid 2px red";
                    throw 'Value error';
                }
                e.style.border = TempStyls[e];
                break;
            case 'text':
                let textArea = e.getElementsByTagName('textarea')[0];
                if(!textArea.value){
                    e.style.border = "solid 2px red";
                    throw 'Value error';
                }

                data[e.dataset.tag] = textArea.value;
                e.style.border = TempStyls[e];
                break;
            default:
                throw 'Unrecognized data type! (' + e.dataset.type + ')';
        }
    });
    console.log(JSON.stringify(data));
}