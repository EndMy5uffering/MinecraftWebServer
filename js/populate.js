window.onload = () => {

    let templates = document.getElementsByTagName('template');


    httpGetJSON('/api/pagedata/helperData').then(e => { 
        if(templates.length > 0){
            Array.from(templates).forEach(tempElement => {
                if(tempElement.dataset.tag in e){
                    let data = e[tempElement.dataset.tag];
                    switch(data.data_type){
                        case 'text':
                            var elem = getTextElement(tempElement.dataset.tag, data.display_text);
                            tempElement.parentNode.replaceChild(elem, tempElement);
                            break;
                        default:
                            tempElement.replaceWith('');
                    }
                }
            });
        }else{
            var center_page = document.getElementsByClassName('center_page')[0];
            var inner = center_page.innerHTML;
            center_page.innerHTML = '';
            for(var elem in e) {
                switch(e[elem].data_type){
                    case 'text':
                        var newElement = getTextElement(elem, e[elem].display_text);
                        center_page.appendChild(newElement);
                        break;
                    case 'checkbox':
                        var newElement = getSelectorElement(elem, e[elem].display_text, e[elem].selectables);
                        center_page.appendChild(newElement);
                        break;
                    default:
                        break;
                }
            }
            center_page.innerHTML += inner;
        }      
        
    });
}

async function httpGetJSON(apiCall)
{
    var options = {
            method: "GET",
            mode: 'cors', // no-cors, *cors, same-origin
        };

    const result = await fetch(apiCall, options)
    .catch(rejected => {
        console.log(rejected);
    });
    return result.json();
}

async function httpGetText(apiCall)
{
    var options = {
            method: "GET",
            mode: 'cors', // no-cors, *cors, same-origin
        };

    const result = await fetch(apiCall, options)
    .catch(rejected => {
        console.log(rejected);
    });
    return result.text();
}

function getTextElement(tag, question){
    return toElement("<div class='question_feeld' data-type='text' data-tag='"+tag+"'><span class='question_text'>"+question+"</span><textarea class='input_feeld' placeholder='...'></textarea></div>");
}

function getSelectorElement(tag, question, selectables){
    let open = "<div class='question_feeld' data-type='checkbox' data-tag='"+tag+"'>"+
    "<span class='question_text'>"+question+"</span>";

    let buttons = "";
    for(var data in selectables){
        buttons += getButton(selectables[data].selector_name, selectables[data].value, selectables[data].display_text);
    }
    return toElement(open + buttons + "</div>");
}

function getButton(name, value, text){
    return "<div class='flex_row box'>"+
    "<div class='selection_button'>"+
    "<input type='radio' name='"+name+"' data-value='"+value+"'>"+
    "<span>"+text+"</span></div></div>";
}

function toElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}