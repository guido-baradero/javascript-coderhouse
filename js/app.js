let continuar;

do {
    let altura = prompt('Ingrese su altura en metros:');
    let peso = prompt('Ingrese su peso en kilogramos:');
    let edad = prompt('Ingrese su edad:');

    altura = parseFloat(altura);
    peso = parseFloat(peso);
    edad = parseInt(edad);

    let calcularIMC = (peso, altura) => {
        let imc = peso / (altura * altura);
        let clasificacionImc;

        if (imc < 18.5) {
            clasificacionImc = 'bajo';
        } else if (imc >= 18.5 && imc < 25) {
            clasificacionImc = 'normal';
        } else if (imc >= 25 && imc < 30) {
            clasificacionImc = 'regular';
        } else {
            clasificacionImc = 'alto';
        }
        imc = imc.toFixed(2);
        return { imc, clasificacionImc };
    };

    let clasificacionEtaria = (edad) => {
        let numeroBanda;
        if (edad >= 15 && edad < 25) {
            bandaEtaria = 'adolecente (entre 15 y 24 años.)';
            numeroBanda = 1;
        } else if (edad >= 25 && edad < 50) {
            bandaEtaria = 'adulto joven (entre 25 y 49 años)';
            numeroBanda = 2;
        } else if (edad >= 50 && edad < 70) {
            bandaEtaria = 'adulto mayor (entre 50 y 70 años';
            numeroBanda = 3;
        } else if (edad >= 70) {
            bandaEtaria = 'tercera edad (mayor de 70 años)';
        } else {
            bandaEtaria = 'es menor de 15 años';
        }
        return { numeroBanda, bandaEtaria };
    };

    if (isNaN(altura) || isNaN(peso) || isNaN(edad)) {
        alert('No ingresó valores válidos para altura, peso o edad');
    } else {
        let { imc, clasificacionImc } = calcularIMC(peso, altura);
        let { numeroBanda, bandaEtaria } = clasificacionEtaria(edad);

        if (numeroBanda === 0) {
            alert('Usted tiene menos de 15 años, consulte un profesional');
        } else {
            alert('Si IMC es de ' + imc + '\nSu clasificacion de IMC es ' + clasificacionImc + '\nPertenece a la franja etaria ' + bandaEtaria);

            if (numeroBanda === 1) {
                if (clasificacionImc === 'normal') {
                    let opc = prompt('Está apto para realizar cualquier tipo de actividad física\nPresione 1 para ver algunas sugerencias o cualquier tecla para salir');
                    if (opc === '1') {
                        alert('Rugby\nFutbol\nGimnasio\nCiclismo\nNatacion');
                    }
                } else if (clasificacionImc === 'regular') {
                    let opc = promp('Le recomendamos hacer actividad física de baja intensidad\nPresione 1 para ver algunas sugerencias o cualquier tecla para salir');
                    if (opc === '1') {
                        alert('Caminata\nCiclismo\nAerobicos de bajo impacto\nYoga\nFuncional');
                    }
                } else if (clasificacionImc === 'bajo') {
                    alert('Su peso es bajo, consulte un nutricionista');
                } else {
                    alert('Consulte un profesional\nCaminar nunca esta de más');
                }
            } else if (numeroBanda === 2) {
                if (clasificacionImc === 'normal') {
                    let opc = prompt('Está apto para realizar cualquier tipo de actividad física\nPresione 1 para ver algunas sugerencias o cualquier tecla para salir');
                    if (opc === '1') {
                        alert('Running\nEntrenamiento de Fuerza\nFutbol\nGimnasio\nCrossFit\nEscaladas');
                    }
                } else if (clasificacionImc === 'regular') {
                    let opc = prompt('Le recomendamos hacer actividad física de baja intenidad\nPresione 1 para ver algunas sugerencias o cualquier tecla para salir');
                    if (opc === '1') {
                        alert('Caminar\nCiclismo\nYoga\nNatacion\nSenderismo');
                    }
                } else if (clasificacionImc === 'bajo') {
                    alert(
                        'Su peso es bajo, consulte un nutricionista.\nPara ganar masa muscular le rcomendamos hacer pesas, no sin antes consultar un profesional');
                } else {
                    alert('Consulte un profesional\nCaminar nunca esta de más');
                }
            } else if (numeroBanda === 3) {
                if (clasificacionImc === 'normal' || clasificacionImc === 'regular') {
                    let opc = prompt('Le recomendamos hacer actividad física de baja intenidad con el adecuado seguimiento de un profesional\nPresione 1 para ver algunas sugerencias o cualquier tecla para salir');
                    if (opc === '1') {
                        alert('Caminata suave\nNatacion\nEjercicios de estiramientos\nYoga\nTai Chi');
                    }
                } else {
                    console.log('Consulte un nutricionista');
                    alert('Su peso es bajo, consulte un nutricionista');
                }
            } else if (numeroBanda === 4) {
                if (clasificacionImc === 'normal') {
                    console.log('Le recomendamos realizar actividades adecuadas a su edad con seguimiento de un profesional');
                } else {
                    console.log('Consulte a un profesional para una evaluación más detallada');
                }
            }
        }
    }
    continuar = prompt('¿Quiere realizar otra consulta? escriba si o no').toLowerCase();
} while (continuar === 'si');

alert('Gracias por su consulta');
