// https://www.researchgate.net/figure/genetic-operators-in-steady-state-genetic-algorithm_tbl1_329482634
class Chromosome {
  constructor(genes) {
    this.genes = genes;
    this.fitness = 0;
  }

  toString() {
    return this.genes + " " + this.fitness;
  }

  copy() {
    let copy = JSON.parse(JSON.stringify(this));
    return new Chromosome(copy.genes);
  }
}

const mutationOperator = {
  ONE_MUTATION: individual => {
    // Reverse the bit of a random index in an individual.
    let index = getRandomInt(individual.genes.length);
    individual.genes[index] = individual.genes[index] == 1 ? 0 : 1;
  },

  TWO_MUTATION: individual => {
    let arr = [];
    for (let i = 0; i < individual.genes.length; ++i) arr.push(i);
    const shuffled = arr.sort(() => 0.5 - Math.random());
    // Two mutations at 2 indexes.
    individual.genes[shuffled[0]] = individual.genes[shuffled[0]] == 1 ? 0 : 1;
    individual.genes[shuffled[1]] = individual.genes[shuffled[1]] == 1 ? 0 : 1;
  }
};

// https://www.obitko.com/tutorials/genetic-algorithms/selection.php
const selections = Object.freeze({
  TOURNAMENT: population => {
    let tournamentSize = Math.floor(population.length / 10);
    if (tournamentSize == 0) tournamentSize = 2;

    const shuffled = population.sort(() => 0.5 - Math.random());
    let fight = shuffled.slice(0, tournamentSize);
    fight = fight.sort((a, b) => b.fitness - a.fitness);
    return fight[0];
  },

  RANDOM: population => {
    let index = getRandomInt(population.length);
    return population[index];
  },

  BOLTZMANN_TOURNAMENT: population => {}
});

const crossOverMethodology = Object.freeze({
  ONE_POINT: (parentOne, parentTwo) => {
    if (typeof parentOne !== "object" || typeof parentTwo !== "object") return;
    let index = Math.floor(Math.random() * (parentOne.length - 1) + 1);
    let alleleOne = parentOne.genes.slice(0, index);
    let alleleTwo = parentTwo.genes.slice(index, parentTwo.genes.length);
    let childOne = alleleOne.concat(alleleTwo);

    let alleleOneChild = parentTwo.genes.slice(0, index);
    let alleleTwoChild = parentOne.genes.slice(index, parentOne.genes.length);
    let childTwo = alleleOneChild.concat(alleleTwoChild);

    let c1 = new Chromosome(childOne);
    let c2 = new Chromosome(childTwo);

    return [c1, c2];
  },

  TWO_POINT: (parentOne, parentTwo) => {
    let arr = [];
    for (let i = 0; i < parentOne.genes.length; ++i) arr.push(i);

    const shuffled = arr.sort(() => 0.5 - Math.random());
    let i0 = shuffled[0];
    let i1 = shuffled[1];
    let twoRandom = [i0, i1].sort();

    let c1 = parentOne.copy();
    let c2 = parentTwo.copy();

    for (let i = twoRandom[0]; i <= twoRandom[1]; ++i) {
      let temp = c1.genes[i];
      c1.genes[i] = c2.genes[i];
      c2.genes[i] = temp;
    }

    return [c1, c2];
  },

  UNIFORM: (parentOne, parentTwo) => {
    // Make a copy of the parents.
    let c1 = parentOne.copy();
    let c2 = parentTwo.copy();

    let genesOne = c1.genes;
    let genesTwo = c2.genes;

    let childGenesOne = [];
    let childGenesTwo = [];

    for (let i = 0; i < parentOne.genes.length; ++i) {
      //Determine if swapped or not.
      let randomBoolean = Math.random() >= 0.5;
      if (randomBoolean) {
        childGenesOne.push(genesTwo[i]);
        childGenesTwo.push(genesOne[i]);
      } else {
        childGenesOne.push(genesOne[i]);
        childGenesTwo.push(genesTwo[i]);
      }
    }

    return [new Chromosome(childGenesOne), new Chromosome(childGenesTwo)];
  },

  PMX: (parentOne, parentTwo) => {

  }
});

class GeneticAlgorithm {
  constructor(
    seedData,
    populationSize = 50,
    generations = 1000,
    crossOverProbability = 0.8,
    mutationProbability = 0.2,
    elitism = true,
    maximiseFitness = true
  ) {
    this.seedData = seedData;
    this.populationSize = populationSize;
    this.generations = generations;
    this.crossOverProbability = crossOverProbability;
    this.mutationProbability = mutationProbability;
    this.elitism = elitism;
    this.maximiseFitness = maximiseFitness;

    this.currentGeneration = [];

    this.fitnessFunction = undefined;
    this.tournamentSize = this.populationSize / 10;
    this.selectionFunction = undefined;
    this.randomSelection = undefined;
    this.mutationOperator = undefined;
    this.crossOverMethodology = undefined;
  }

  setMaximiseFitness(maximiseFitness) {
    this.maximiseFitness = maximiseFitness;
  }

  setFitnessFunction(fitness) {
    this.fitnessFunction = fitness;
  }

  setSelectionFunction(selection) {
    this.selectionFunction = selection;
  }

  setCrossOverMethodology(crossOver) {
    this.crossOverMethodology = crossOver;
  }

  setMutationOperator(mutation) {
    this.mutationOperator = mutation;
  }

  createIndividual(seedData) {
    let individual = [];
    //let length = Object.keys(seedData).length;
    let length = seedData["length"] * seedData["geneSize"];
    for (let i = 0; i < length; i++) {
      individual[i] = Math.floor(Math.random() * 2);
    }
    return individual;
  }

  createInitialPopulation() {
    let initialPopulation = [];

    for (let i = 0; i < this.populationSize; i++) {
      let genes = this.createIndividual(this.seedData);
      let individual = new Chromosome(genes);
      initialPopulation.push(individual);
    }

    this.currentGeneration = initialPopulation;
  }

  calculatePopulationFitness() {
    for (let individual of this.currentGeneration) {
      individual.fitness = this.fitnessFunction(
        individual.genes,
        this.seedData
      );
    }
  }

  rankPopulation() {
    this.currentGeneration.sort((a, b) => b.fitness - a.fitness);
  }

  createNewPopulation() {
    let newPopulation = [];
    let elite = this.currentGeneration[0].copy();
    let selection = this.selectionFunction;
    let crossOver = this.crossOverMethodology;
    let mutation = this.mutationOperator;

    while (newPopulation.length < this.populationSize) {
      this.calculatePopulationFitness();
      let p1 = selection(this.currentGeneration);
      let p2 = selection(this.currentGeneration);

      let parentOne = new Chromosome(p1.genes);
      let parentTwo = new Chromosome(p2.genes);

      let childOne = parentOne.copy();
      let childTwo = parentTwo.copy();

      let canCrossOver = Math.random() < this.crossOverProbability;
      let canMutate = Math.random() < this.mutationProbability;

      if (canCrossOver) {
        let children = crossOver(parentOne, parentTwo);
        childOne = children[0];
        childTwo = children[1];
      }

      if (canMutate) {
        mutation(childOne);
        mutation(childTwo);
      }

      newPopulation.push(childOne);
      newPopulation.push(childTwo);

      this.currentGeneration = newPopulation;
      this.calculatePopulationFitness();
    }
  }

  createFirstGeneration() {
    this.createInitialPopulation();
    this.calculatePopulationFitness();
    this.rankPopulation();
    console.log(this.currentGeneration);
  }

  createNextGeneration() {
    this.createNewPopulation();
    this.calculatePopulationFitness();
    this.rankPopulation();
  }

  run() {
    this.createFirstGeneration();

    for (let i = 0; i <= this.generations; i++) {
      console.log("At generation " + i);
      let best = this.bestIndividual();

      if (this.bestIndividual().fitness == calculateFitness("INSANITY", "INSANITY"))
        return;

      this.createNextGeneration();
    }
  }

  bestIndividual() {
    let best = this.currentGeneration[0];
    return best;
  }
}

let getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

// Fitness function returns the value.
let currentFitness = (individual, data) => {
  let fitness = 0;
  const result = individual.filter(i => i === 1).length;
  const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);

  if (result < 3) {
    let zipped = zip(individual, data);
    for (let i = 0; i < zipped.length; ++i) {
      if (zipped[i][0] == 1) fitness += zipped[i][1];
    }
    if (fitness > 200) return 0;
  }
  return fitness;
};

let wordFitness = (individual, data) => {
  let length = individual.length;
  let decoded = decodeArray(individual);
  return calculateFitness(decoded, "INSANITY");
};

let data = {
  geneSize: 5,
  length: 8
};

const codes = {
  "@": [0, 0, 0, 0, 0],
  A: [0, 0, 0, 0, 1],
  B: [0, 0, 0, 1, 0],
  C: [0, 0, 0, 1, 1],
  D: [0, 0, 1, 0, 0],
  E: [0, 0, 1, 0, 1],
  F: [0, 0, 1, 1, 0],
  G: [0, 0, 1, 1, 1],

  H: [0, 1, 0, 0, 0],
  I: [0, 1, 0, 0, 1],
  J: [0, 1, 0, 1, 0],
  K: [0, 1, 0, 1, 1],
  L: [0, 1, 1, 0, 0],
  M: [0, 1, 1, 0, 1],
  N: [0, 1, 1, 1, 0],
  O: [0, 1, 1, 1, 1],

  P: [1, 0, 0, 0, 0],
  Q: [1, 0, 0, 0, 1],
  R: [1, 0, 0, 1, 0],
  S: [1, 0, 0, 1, 1],
  T: [1, 0, 1, 0, 0],
  U: [1, 0, 1, 0, 1],
  V: [1, 0, 1, 1, 0],
  W: [1, 0, 1, 1, 1],

  X: [1, 1, 0, 0, 0],
  Y: [1, 1, 0, 0, 1],
  Z: [1, 1, 0, 1, 0],
  "[": [1, 1, 0, 1, 1],
  "\\": [1, 1, 1, 0, 0],
  "]": [1, 1, 1, 0, 1],
  "^": [1, 1, 1, 1, 0],
  _: [1, 1, 1, 1, 1]
};

// https://stackoverflow.com/questions/8495687/split-array-into-chunks
let chunk = (arr, len) => {
  var chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
};

let convertoGrayCode = str => {
  let resultArr = [];
  for (let i = 0; i < str.length; ++i) {
    let code = codes[str[i]];
    resultArr = resultArr.concat(code);
  }
  return resultArr;
};

// Given an array it will return the character/String representation.
let decode = arr => {
  //Get values
  let values = Object.values(codes);
  let index = 0;

  for (let i = 0; i < values.length; ++i) {
    if (values[i].toString() == arr.toString()) return Object.keys(codes)[i];
  }
};

// Chunks here
let decodeArray = arr => {
  let chunked = chunk(arr, 5);
  let result = "";
  for (let i = 0; i < chunked.length; ++i) {
    let alpha = decode(chunked[i]);
    result += alpha;
  }
  return result;
};

let calculateFitness = (str, target) => {
  let fitness = 0;
  for (let i = 0; i < str.length; ++i) {
    if (str[i] == target[i]) fitness += 1;
    fitness += (127 - Math.abs(str.charCodeAt(i) - target.charCodeAt(i))) / 50;
  }
  return fitness;
};

const ga = new GeneticAlgorithm(data);
ga.setSelectionFunction(selections.TOURNAMENT);
ga.setFitnessFunction(wordFitness);
ga.setCrossOverMethodology(crossOverMethodology.TWO_POINT);
ga.setMutationOperator(mutationOperator.ONE_MUTATION);
ga.run();

console.log(ga.currentGeneration);
let best = ga.bestIndividual();
console.log(best);
console.log(decodeArray(best.genes));