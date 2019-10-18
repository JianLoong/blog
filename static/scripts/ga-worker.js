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

  crossOver(chromosome, methodology) {}
}

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

  PMX: (parentOne, parentTwo) => {}
});

let results = [];

var arrayChangeHandler = {
  get: function(target, property) {
    console.log("getting " + property + " for " + target);
    // property is index in this case
    return target[property];
  },
  set: function(target, property, value, receiver) {
    console.log(
      "setting " + property + " for " + target + " with value " + value
    );
    target[property] = value;
    // you have to return true to accept the changes
    return true;
  }
};

var originalArray = [];
var proxyToArray = new Proxy(originalArray, arrayChangeHandler);

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

const mutationOperator = {
  ONE_MUTATION: individual => {
    // Reverse the bit of a random index in an individual.
    let index = getRandomInt(individual.genes.length);
    let mutated = getRandomInt(data.geneSize);
    individual.genes[index] = mutated;
  },

  TWO_MUTATION: individual => {
    let arr = [];
    for (let i = 0; i < individual.genes.length; ++i) arr.push(i);
    const shuffled = arr.sort(() => 0.5 - Math.random());
    // Two mutations at 2 indexes.
    individual.genes[shuffled[0]] = getRandomInt(data.geneSize);
    individual.genes[shuffled[1]] = getRandomInt(data.geneSize);
  }
};

class GeneticAlgorithm {
  constructor(
    seedData,
    populationSize = 100,
    generations = 2000,
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
    let length = seedData["length"];
    for (let i = 0; i < length; i++) {
      individual[i] = Math.floor(Math.random() * seedData["geneSize"]);
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
      //this.calculatePopulationFitness();
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
      if (newPopulation.length < this.populationSize)
        newPopulation.push(childTwo);
      //newPopulation.push(childTwo);

      //this.calculatePopulationFitness();
    }

    if (this.elitism) newPopulation[0] = elite;
    this.currentGeneration = newPopulation;
  }

  createFirstGeneration() {
    this.createInitialPopulation();
    this.calculatePopulationFitness();
    this.rankPopulation();
  }

  createNextGeneration() {
    this.createNewPopulation();
    this.calculatePopulationFitness();
    this.rankPopulation();
  }

  displayBest() {
    let genes = this.currentGeneration[0].genes;
    let output = "";
    for (let i = 0; i < genes.length; ++i) {
      output += getKeyByValue(mapping, genes[i]);
    }

    console.log(output);
  }

  run() {
    this.createFirstGeneration();

    for (let i = 0; i <= this.generations; i++) {
      console.log("At generation " + i);

      this.createNextGeneration();
      if (
        wordFitness(this.bestIndividual().genes) ==
        data["geneSize"] * data["length"]
      ) {
        return;
      }
    }
  }

  bestIndividual() {
    let best = this.currentGeneration[0];
    return best;
  }
}

const wordFitness = individual => {
  let fitness = 0;
  for (let i = 0; i < individual.length; ++i) {
    fitness += Math.abs(individual[i] - target[i]);
  }
  return data["geneSize"] * data["length"] - fitness;
};

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const mapping = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
  " ": 26,
  "?": 27,
  "0": 28,
  "1": 29,
  "2": 30,
  "3": 31,
  "4": 32,
  "5": 33,
  "6": 34,
  "7": 35,
  "8": 36,
  "9": 37,
  "!": 38
};

const generateTarget = target => {
  let mapped = [];
  for (let i = 0; i < target.length; ++i) {
    mapped.push(mapping[target[i]]);
  }

  return mapped;
};



const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};

let target = generateTarget(
  "Test".toLocaleUpperCase()
);

let data = {
  geneSize: Object.keys(mapping).length,
  length: target.length
};

onmessage = function(e) {
  console.log("Worker: Message received from main script");
 

  const ga = new GeneticAlgorithm(data);
  ga.setSelectionFunction(selections.TOURNAMENT);
  ga.setFitnessFunction(wordFitness);
  ga.setCrossOverMethodology(crossOverMethodology.TWO_POINT);
  ga.setMutationOperator(mutationOperator.ONE_MUTATION);
  ga.run();
  let best = ga.bestIndividual();

  this.postMessage(best.genes);

};
