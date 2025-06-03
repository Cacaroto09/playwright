import { test, Browser, Page, expect } from '@playwright/test';
 
(async () => {
  let browser: Browser;
  let page: Page;
 
  test.describe('Navegación en www.freerangetesters.com', () => {
    const secciones = [
      { nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos' },
      { nombre: 'Udemy', url: '/udemy', tituloEsperado: 'Udemy' },
      { nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos' },
      { nombre: 'Blog', url: '/login', tituloEsperado: 'Acceder a Free Range Testers' }
    ];
      // Agrega más secciones si es necesario
          test(`loz links principales redirigen correctamente`, async ({ page }) => {
        await test.step(`Estando yo en la web principal www.freerangetesters.com`, async () => {
          page.goto('https://www.freerangetesters.com');
          await expect(page).toHaveTitle('Free Range Testers');
        });
 
        await test.step(`Cuando hago click en "cursos"`, async () => {
          page.locator('#page_header').getByRole('link', { name: 'Cursos', exact: true }).click();
          await page.waitForURL(`**/cursos`);
        });
 
        await test.step(`Soy redirigido a la sección de título " cursos"`, async () => {
            await expect(page).toHaveTitle('Cursos');
        });
      });
    })

})(); 