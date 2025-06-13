///// SAMPLE DATA FOR YOUR EXPERIMENTATION PLEASURE (do not modify)
const fruits: Dict<fruits> = {
  apple: { color: "red", mass: 100 },
  grape: { color: "red", mass: 5 },
  banana: { color: "yellow", mass: 183 },
  lemon: { color: "yellow", mass: 80 },
  pear: { color: "green", mass: 178 },
  orange: { color: "orange", mass: 262 },
  raspberry: { color: "red", mass: 4 },
  cherry: { color: "red", mass: 5 },
}
 
interface Dict<T> {
  [k: string]: T
}
type fruits = {
  color: string // color of the fruit
  mass: number // mass of the fruit in grams     
}
// Array.prototype.map, but for Dict
function mapDict<T, U>(
  dict: Dict<T>, 
  callback: (val: T, key: string)=> U
): Dict<U> 
  {
  const result: Dict<U> = {}
  for (const key in dict) {
    // to avoid iterating over properties from the prototype chain
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
      result[key] = callback(dict[key], key)
    }
  }
  return result
}
// Array.prototype.filter, but for Dict
function filterDict<T>(
  dict: Dict<T>, 
  callback: (value: T, key: string) => 
    boolean
): Dict<T> {

  const result: Dict<T> = {}
  for(const key in dict){
    // prototype chain check
    if(Object.prototype.hasOwnProperty.call(dict, key)){
      const value = dict[key]
      // if callback returns true, add the key-value pair to result
      if(callback(value, key)){
        result[key] = value 
      }
    }
  }
  return result
}
// Array.prototype.reduce, but for Dict
function reduceDict<T, U>(
  dict: Dict<T>, 
  callback: (currentVal: U, dictItem: T, key: string)=> U,
  acc: U
): U {

  let result: U = acc

  for(const key in dict){
    // prototype chain check
    if(Object.prototype.hasOwnProperty.call(dict, key)){
      const value = dict[key]
      result = callback(result, value, key)
    }
  }
  return result
}

/////////////////////////////////////////
///////////// TEST SUITE ///////////////
//////// no need to modify these ////////
/////////////////////////////////////////


// test mapDict
const fruitsWithKgMass = mapDict(fruits, (fruit, name) => ({
  ...fruit,
  kg: 0.001 * fruit.mass,
  name,
}))
console.log("test mapDict: ", fruitsWithKgMass)


// test filterDict
const redFruits = filterDict(
  fruits,
  (fruit) => fruit.color === "red"
)
console.log("test filterDict: ", redFruits)
// should be apple, grape, raspberry, cherry

// test reduceDict
const oneOfEachFruitMass = reduceDict(
  fruits,
  (currentMass, fruit) => currentMass + fruit.mass,
  0
)

console.log("test reduceDict: ", oneOfEachFruitMass)
// should be 100 + 5 + 183 + 80 + 178 + 262 + 4 + 5 = 817 