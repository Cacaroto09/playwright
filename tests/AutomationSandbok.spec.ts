import { test, Browser, Page, expect } from '@playwright/test';
import { SandboxPage } from './Pages/SandboxPage';
import dotenv from 'dotenv';
dotenv.config();
const baseURL = process.env.BASE_URL || '';
(async () => {
    let browser: Browser;
    let page: Page;
    let textoAEscribir = 'Estoy aprendiendo Playwright por variable'
    test.describe('Acciones en el Automation Sandbox', () => {
        test('Click en Boton ID Dinamico' , async({ page }) => {
            
            await test.step('Dado que navego a free range testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })
        await test.step ('Puedo hacer click en el boton con ID dinamico' , async () => {
            await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click();
            await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
        })
        })
        /* realizar un skip de una prueba con un condicional por ejemplo no funciona para chrome*/
        /* Sumar anotaciones .info */
        test('lleno un campo de texto en Automation Sandbox',async({page,browserName}) => {
            test.info().annotations.push({
               type: 'User Story 122',
               description: 'el usuario puede seleccionar un dia'
                           })
            test.skip(browserName === 'chromium','No anda en Chrome todavia')
            
            
            await test.step('Dado que navego a free range testers', async () => {
               // await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
               await page.goto(baseURL);
        })
            await await test.step('Puedo ingresar texto', async () => {
               await expect(page.getByRole('textbox', { name: 'Un aburrido texto' }),'El campo de texto no admite edicion').toBeEditable(); 
              await  page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(textoAEscribir);
              await expect(page.getByRole('textbox', { name: 'Un aburrido texto' }),'El campo no tiene el valor esperado').toHaveValue(textoAEscribir);
            
            })
            
    })
    test('Puedo seleccionar checkboes',async({page}) => {
        await test.step('Dado que navego a free range testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        
    })
        await test.step('Puedo seleccionar el checkbox para Pasta', async () => {
         const sandbox = new SandboxPage(page);
         await sandbox.checkPasta();
        //    await page.getByRole('checkbox', { name: 'Pasta 🍝' }).check();
        
            await expect(sandbox.pastaCheckbox,'el checkbok no estaba seleccionado').toBeChecked();
        })
        
})
test('Radio button Automation Sandbox',async({page}) => {
    await test.step('Dado que navego a free range testers', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    
})
    await await test.step('Puedo seleccionar el Radio button para NO', async () => {
        await page.getByRole('radio', { name: 'No' }).check();
            await expect(page.getByRole('radio', { name: 'No' }),'el radio buton no se selecciono').toBeChecked();

    })
    
})
test('Los items del dropdown son los esperados', async ({ page }) => {
    await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })
    await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
        const deportes = ['Fútbol', 'Tennis', 'Basketball']

        for (let opcion of deportes) {
            const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
            if (element) {
                console.log(`La opción '${opcion}' está presente.`);
            } else {
                throw new Error(`La opción '${opcion}' no está presente.`);
            }
        }

    })


})
/*Anotacion ejemple only sirve para correr solo el test*/

test('DropDown dia de la semana Automation Sandbox',async({page}) => {
    await test.step('Dado que navego a free range testers', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    
})
     await test.step('Puedo seleccionar el Radio button para NO', async () => {
       await page.getByRole('button', { name: 'Día de la semana' }).click();
       await page.getByRole('link', { name: 'Martes' }).click();
    })
    
})
/*Anotaciones ejemplo skip sirve para saltear la prueba*/
test.skip('Validando dentro de un popup', async ({ page }) => {
    await test.step('Dado que navego al sandbox', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })

    
    /* 
    Forma si tiene el evento popup
    const poupPromise = page.waitForEvent('popup');
    await page.getByText('open the popup').click();
    const popup = await poupPromise;
    await popup.waitForLoadState();
    console.log(await popup.title());    
    */

    await test.step('Cuando hago click en el botón popup', async () => {
        await page.getByRole('button', { name: 'Mostrar popup' }).click();
    })

    await test.step('Puedo validar un elemento dentro del popup', async () => {
        await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
        await page.getByRole('button', { name: 'Cerrar' }).click();

    })


})
test('Ejemplo de Soft Assertions', async ({ page }) => {
    await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })
    await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
        await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizza 🍕').toBeVisible();
        await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
        await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
        await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helado 🍧').toBeVisible();
        await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
    })

})
test('Valido que todos los valores cambian en la tabla dinámica luego de un reload', async ({ page }) => {
    await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })

    await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
        //Creamos un arreglo con todos los valores de la tabla dinámica
        const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
        console.log(valoresTablaDinamica);

        //Hacemos una recarga para que cambien los valores
        await page.reload();

        //Creamos un segundo arreglo con los valores luego de la recarga
        const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
        console.log(valoresPostReload);

        //Validamos que todos los valores cambiaron para cada celda.
        expect(valoresTablaDinamica).not.toEqual(valoresPostReload);

    })


})
test('Valido la columna Nombres de la tabla estática', async ({ page }) => {
    await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })

    await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
        const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
        const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
        //Saca una screen y la adjunta aunque el caso pase.
        await test.info().attach('screenshot', {
            body: await page.screenshot(),
            contentType: 'image/png',
        })
        expect(valoresColumnaNombres).toEqual(nombresEsperados);
    })

})
    })
})();
