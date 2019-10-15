+++
title = "Genetic Algorithm"
weight = 15
date = 2019-10-15
pre = "<b>15th. </b>"
draft = true
tags = ["Genetic Algorithm", "Chart", "Knapsack Problem"]
+++

<script>


const knapSackSize = 15;
const populationSize = 10;

class Chromosome {
  constructor(genes) {
    this.genes = genes;
    this.fitness = 0;
  }

  toString() {
    return this.genes + " " + this.fitness;
  }
}

class GeneticAlgorithm {
  constructor(
    seedData,
    populationSize = 10,
    generations = 100,
    crossOverProbability = 0.8,
    mutationProbability = 0.2,
    elitism = true,
    maximiseFitness = true
  ) {
    this.seedData = seedData;
    this.populationSize = populationSize;
    this.generations = generations;
    this.crossOverProbability = crossOverProbability;
    this.mutationProbability = 0.2;
    this.elitism = elitism;
    this.maximiseFitness = maximiseFitness;

    this.currentGeneration = [];

    // Fitness functions
    this.fitnessFunction = undefined;
    // this.tournamentSize = self.populationSize / 10;
  }

  tournamentSelection(population) {}

  createIndividual(seedData) {
    let individual = [];
    let length = Object.keys(seedData).length;
    for (let i = 0; i < length; i++) {
      individual[i] = Math.floor(Math.random() * 2);
    }
    return individual;
  }

  crossOver(parentOne, parentTwo) {
    let index = Math.floor(Math.random() * (parentOne.length - 1) + 1);

    let alleleOne = parentOne.genes.slice(0, index);
    let alleleTwo = parentTwo.genes.slice(index, parentTwo.genes.length);
    let childOne = alleleOne.concat(alleleTwo);

    let alleleOneChild = parentTwo.genes.slice(0, index);
    let alleleTwoChild = parentOne.genes.slice(index, parentOne.genes.length);
    let childTwo = alleleOneChild.concat(alleleTwoChild);

    let c1 = new Chromosome(childOne);
    // c1.genes = childOne;

    let c2 = new Chromosome(childTwo);
    // c2.genes = childTwo;

    // console.log(c1);

    // console.log(c2);
    return [c1, c2];
  }

  mutate(individual) {
    // Reverse the bit of a random index in an individual.
    let index = Math.floor(Math.random() * (parentOne.length - 0) + 0);
    individual[index] = individual[index] == 1 ? 0 : 1;
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
      individual.fitness = fitness(individual.genes, this.seedData);
    }
  }

  rankPopulation() {
    this.currentGeneration.sort((a, b) => b.fitness - a.fitness);
  }

  createNewPopulation() {
    let newPopulation = [];

    // Create a deep copy.
    //let elite =  JSON.parse(JSON.stringify(this.currentGeneration[0]));
    while (newPopulation.length < this.populationSize) {
      let indexOne = getRandomInt(this.currentGeneration.length);
      let indexTwo = getRandomInt(this.currentGeneration.length);

      let p1 = this.currentGeneration[indexOne];
      let p2 = this.currentGeneration[indexTwo];

      let parentOne = new Chromosome(p1.genes);
      let parentTwo = new Chromosome(p2.genes);

      let children = this.crossOver(parentOne, parentTwo);

      newPopulation = newPopulation.concat(children);

      this.currentGeneration.concat(children);
    }
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

  run() {
    this.createFirstGeneration();

    for (let i = 0; i < this.generations; i++) {
      this.createNextGeneration();
    }
  }

  bestIndividual() {
    let best = this.currentGeneration[0];
    return best;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Fitness function returns the value.
let fitness = (individual, data) => {
  let fitness = 0;
  for (let i = 0; i < individual.length; i++) {
    individual[i] == 1 ? (fitness += data[i]) : (fitness += 0);
  }

  if (fitness > 100) return 0;

  return fitness;
};

let data = {
  0: 50,
  1: 35,
  2: 50,
  3: 10
};

const ga = new GeneticAlgorithm(data);

ga.createFirstGeneration();
ga.createNextGeneration();
console.log(ga.currentGeneration);
ga.run();

let best = ga.bestIndividual();

console.log(best);
//console.log(ga.currentGeneration);

</script>