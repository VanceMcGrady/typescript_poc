function timeout(n: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, n);
  });
}

export async function addNumbers(a: number, b: number): Promise<number> {
  await timeout(500);
  return a + b
}

class Foo {
  static #bar = 42;
  static getBar(): number { 
    return Foo.#bar;
  }
}

(async () => {  
  console.log(await addNumbers(42, Foo.getBar()));
})()