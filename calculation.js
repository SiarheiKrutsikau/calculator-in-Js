//    описание массива:
//    0 число 1
//    1 знак
//    2 число 2
//    3 результат
//    4 перебор верхней строки
//    5 переменная del отвечающая за сброс первого числа не при нажатии enter
//    6 метка для проверки был ли набор
//    7 память M


element = Array();

//обработка нажатия кнопок на клавиатуре
    document.addEventListener('keydown', function(k){
       if (k.key=='1'||k.key=='2'||k.key=='3'||k.key=='4'||k.key=='5'||k.key=='6'||k.key=='7'||k.key=='8'||k.key=='9'){
       f=k.key;
       opr(f);
    }
    if(k.key=='0') opr('nullN');   
    if(k.key=='+') opr('plus');   
    if(k.key=='-') opr('minus');   
    if(k.key=='/') opr('division');   
    if(k.key=='*') opr('multiplication');   
    if(k.key=='Enter') opr('result');   
    if(k.key=='Escape') opr('c');   
    if(k.key=='.') opr('zap');   
    if(k.key=='Backspace') opr('backspace');   
    if(k.key=='Delete') opr('ce');   
});

//обработка нажатия кнопок на экране
document.addEventListener("click",  function (event) {
    var f = event.target.id;
    opr(f);
});

function opr(f){
    if (f) {
        if (f == '1' || f == '2' || f == '3' || f == '4' || f == '5' || f == '6' || f == '7' || f == '8' || f == '9' || f == 'nullN') {
            let outpush = Number(f);
            if (f == 'nullN')
                outpush = 0;
            screen(outpush);
        }
        if (f == 'ce' || f == 'c') {
            screen(f);
        }
        if (f == 'zap') {
            screen(f);
        }
        if (f == 'plus') {
            screen('+');
            //split();
        }
        if (f == 'minus') {
            screen('-');
        }
        if (f == 'division') {
            screen('/');
        }
        if (f == 'multiplication') {
            screen('*');
        }
        if (f == 'result') {
            screen(f);
        }

        //Изменение знака
        if (f == 'sign') {
            //    outresult(f);
            screen(f);
        }

        //удаление символов 
        if (f == 'backspace') {
            screen(f);
        }

        //квадратный корень
        if (f == 'square') {
            screen(f);
        }

        // 1/x
        if (f == 'derivative') {
            screen(f);
        }
        if (f == 'percent') {
            screen('%');
        }
        if (f == 'ms' || f == 'mc' || f == 'mr' || f == 'm+' || f == 'm-') {
            screen(f);
        }
    }
}

function screen(out) {

    //защита от 0
    let elem = document.getElementById('outresult');
    let all = document.getElementById('outall');
    let memory = document.getElementById('outM');
    if (out == '+' && elem.innerHTML == 0 && element[0] != 0)
        return;
    if (out == '-' && elem.innerHTML == 0 && element[0] != 0) {
        return;
    }
    if (out == '/' && elem.innerHTML == 0 && element[0] != 0) {
        return;
    }
    if (out == '*' && elem.innerHTML == 0 && element[0] != 0) {
        return;
    }
    if (out == 'sign' && elem.innerHTML == 0) {
        return;
    }
    if (out == 'derivative' && elem.innerHTML == 0) {
        return;
    }
    if (out == 'backspace' && elem.innerHTML == '0' && elem.innerHTML != '0.') {
        return;
    }
    if (out == 'square' && elem.innerHTML == 0) {
        return;
    }
    if (all.innerHTML == 'ЧИСЛО БЕСКОНЕЧНОСТЬ' || all.innerHTML == 'КОМПЛЕКСНОЕ ЧИСЛО' || all.innerHTML == 'НА НОЛЬ ДЕЛИТЬ НЕЛЬЗЯ') {
        delce();
        return;
    }

    //проверить на наличие запятой
    if (out == 'zap') {
        resmas = elem.innerHTML.search(/\./);
        if (resmas == -1) {
            elem.innerHTML = elem.innerHTML + '&#46;';
        } else {
            return;
        }
    }

    //память M

    if (out == 'ms') {
        memory.style.display = 'inline-block';
        element[7] = Number(elem.innerHTML);
    }
    if (out == 'mc') {
        memory.style.display = 'none';
        element[7] = undefined;
    }

    if (element[7] != undefined) {
        if (out == 'mr') {
            elem.innerHTML = element[7];
            element[5] = 'del';
            element[6] = 'on';

        }
        if (out == 'm+') {
            element[7] = Number(elem.innerHTML) + element[7];
            element[5] = 'on';
        }
        if (out == 'm-') {
            element[7] = element[7] - Number(elem.innerHTML);
            element[5] = 'on';
        }
    }

    //проверить на наличие знаков
    if (out == '+' || out == '-' || out == '*' || out == '/' || out == 'result' || out == '%') {

        //проверка на число после ввода 
        if (element[0] != undefined && element[1] == 'enter' && element[6] == 'off') {
            element[0] = undefined;
            element[1] = undefined;
            element[6] = 'on';
        } else if (element[1] == 'enter' && element[6] == 'on') {
            element[0] = undefined;
            element[1] = undefined;
        }

        //проверка на изменение знака
        if (element[0] && !element[2] && element[1] != out && element[6] == 'off' && out != 'result' && out != 'result') {
            element[1] = out;

            //замена в верхней строке
            all.innerHTML = all.innerHTML.slice(0, -1) + out;
            return;
        } else if (element[6] == 'off')
            return;

        //проценты
        if (out == '%' && element[0] !== undefined && element[1] !== undefined) {
            time = element[0] * elem.innerHTML / 100;
            time = checkValue(time);
            elem.innerHTML = time;

            //out='+';
            return;
        } else if (out == '%') {
            delce();
            return;
        }

        //нет элементов
        if (element[0] === undefined && element[2] === undefined && out != 'result') {
            element[0] = Number(elem.innerHTML);
            element[1] = out;
            if (all.innerHTML == 0)
                all.innerHTML = '';
            //            if(element[2]==undefined)all.innerHTML='t';
            all.innerHTML = all.innerHTML + element[0] + element[1];
            element[6] = 'off';
            element[5] = 'del';
            return;
        }

        //первый элемент есть
        if (element[0] !== undefined && element[2] === undefined || out == 'result' && element[0] !== undefined && element[2] === undefined && element[6] == 'on') {
            element[2] = Number(elem.innerHTML);
            //производит вычесления
            inf = get(element[1]);
            if (inf != Infinity && !isNaN(inf)) {
                element[3] = get(element[1]);
            } else if (isNaN(inf)) {
                all.innerHTML = 'ДЕЛЕНИЕ НА НОЛЬ НЕВОЗМОЖНО';
                element[3] = 0;

                return;
            } else {
                all.innerHTML = 'ЧИСЛО БЕСКОНЕЧНОСТЬ';
                element[3] = 0;
                //              delce();
                return;
            }
            elem.innerHTML = element[3];

            //проверка на перебор верхней строки
            let x = checkValue(element[3]);
            time = '';
            for (i = 0; i < 3; i++) {
                time = time + element[i];
            }
            jit = time + '=' + x; //новое число типа 5+5=10
            alljit = all.innerHTML + jit;
            if (alljit.length > 40) {
                all.innerHTML = '=' + element[3];
            } else {
                element[2] < 0 ? el2 = '(' + element[2] + ')' : el2 = element[2];
                all.innerHTML = all.innerHTML + el2 + '=' + x + '';
            }

            // перезапись  не введен enter
            if (out != 'result') {
                element[0] = element[3];
                element[1] = out;
                element[2] = undefined;
                all.innerHTML = all.innerHTML + element[1];
            } else {
                time = element[3];
                delce();
                element[0] = elem.innerHTML = time;
                element[1] = 'enter';
            }

            //меняет знак
            element[6] = 'off';
            element[5] = 'del';

            return;

        } else if (out == 'result') {
            return;
        }

        function get(x) {
            if (x == '+')
                return element[0] + element[2];
            if (x == '-')
                return element[0] - element[2];
            if (x == '*')
                return element[0] * element[2];
            if (x == '/')
                return element[0] / element[2];

        }
        //описание массива
        //         0 число1
        //         1 знак
        //         2 число 2
        //         3 результат
        //         4 перебор верхней строки
        //         5 переменная del отвечающая за сброс первого числа не при нажатии enter
        //         6 метка для проверки был ли набор
        //         7 память M
    }

    //all
    let x = elem.innerHTML.search(/\./);
//        let rr=undefined;
//        let rr1=0;
    if (elem.innerHTML == 0 && out != 'c' && out != 'ms' && out != 'mr' && out != 'mc' && out != 'm+' && out != 'm-' && out != 'ce' && x != '1' && out != 'backspace' && out != 'derivative' && out != '+' && out != '-' && out != '/' && out != '*' && out != 'result' && out != '%') {
        if (out == 'zap')
            out = '0.';
        element[6] = 'on';//был набор
        elem.innerHTML = out;
        element[5] = undefined;
    } else if (out != 'ce' && out != 'c' && out != 'ms' && out != 'mr' && out != 'mc' && out != 'm+' && out != 'm-' && out != 'sign' && out != 'backspace' && out != 'square' && out != 'zap' && out != 'derivative' && out != '+' && out != '-' && out != '/' && out != '*' && out != 'result' && out != '%') {
        if (element[5] == 'del') {
            elem.innerHTML = '';
            element[5] = undefined;
        }

        //проверка ввода на переполнение
        //длинна добавляемого значения
        long = out.toString().length;
        check(long);

        //результат сложения основное
        elem.innerHTML = elem.innerHTML + out;
        element[6] = 'on';//был набор
        //сброс значений
    } else if (out == 'ce') {
        elem.innerHTML = 0;
        for (i = 0; i < 5; i++) {
            element[i] = undefined;
        }
        element[6] = 'off';
        if (all.innerHTML != 0)
            all.innerHTML = '<span style="color:red">' + all.innerHTML + ' <span>';

    } else if (out == 'c') {
        delce();
    }

    //удаление всего 
    function delce() {
        elem.innerHTML = 0;
        all.innerHTML = 0;
        for (i = 0; i < element.length - 1; i++) {
            element[i] = undefined;
        }
        element[6] = 'off';
        return;
    }

    //derivative
    if (out == 'derivative') {
        let der = elem.innerHTML;
        result = Number(1 / der);
        x = checkValue(result);
        elem.innerHTML = x;
    }

    //backspace
    if (out == 'backspace') {
        elem = document.getElementById('outresult');
        kol = elem.innerHTML.length;
        let x = elem.innerHTML.search(/\./);
        if (kol != 1) {
            elem.innerHTML = elem.innerHTML.slice(0, kol - 1);
        } else {
            elem.innerHTML = 0;
            return;
        }
    }

    // квадратный корень
    if (out == 'square') {
        elem1 = document.getElementById('outresult');
        elem = Number(elem1.innerHTML);
        if (elem > 0 && elem != undefined) {
            outpush = Math.sqrt(elem);
            x = checkValue(outpush);
            elem1.innerHTML = x;
        } else
        {
            if (elem < 0) {
                all.innerHTML = 'КОМПЛЕКСНОЕ ЧИСЛО';
            }
        }

    }

    //sign
    if (out == 'sign') {
        if (elem.innerHTML[0] != '-') {
            elem.innerHTML = '-' + elem.innerHTML;
        } else
        {
            elem.innerHTML = elem.innerHTML.slice(1);
            ;
        }
    }

}

//проверка по полученным данным 
function checkValue(parameters) {
    parameters = Number(parameters);

    cel = Math.trunc(parameters);

    //дробная часть
    longE = parameters - cel;

    //ДЛИНА ДРОБНОЙ ЧАСТИ
    lon = longE.toString().length;

    //ДЛИНА ЦЕЛОЙ ЧАСТИ
    cel1 = cel.toString().length;
    if (lon > 18) {
        lon = (19 - cel1);
        outpush = cel + Number(longE.toFixed(lon));
        return outpush;
    } else {
        return parameters;
    }
}

//проверка введенных символов по длинне
function check(ck) {
    let outr = document.getElementById('outresult');
    let stat = outr.innerHTML;
    let outrl = outr.innerHTML.length;
    if ((outrl + ck) > 18) {
        //    x='return;'
        x = stat.split('');
        x.pop();
        str = x.join('');
        outr.innerHTML = str;
    }
}




