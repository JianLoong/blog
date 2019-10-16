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
  ONE_MUTATION: (individual) => {
    // Reverse the bit of a random index in an individual.
    //let index = Math.floor(Math.random() * (individual.genes.length - 0) + 0);
    let index = getRandomInt(individual.length);
    let random = getRandomInt(2);
    individual.genes[index] = random;
  },

  TWO_MUTATION: (individual) => {
    let arr = [];
    for(let i = 0; i < individual.genes.length; ++i){
      arr.push(i);
    }  

    const shuffled = arr.sort( () => 0.5 - Math.random());

    let i0 = shuffled[0];
    let i1 = shuffled[1];

    individual[i0] == 1 ? 0 : 1;
    individual[i1] == 1 ? 0 : 1;
  }
}

// https://www.obitko.com/tutorials/genetic-algorithms/selection.php
const selections = Object.freeze({
  TOURNAMENT: population => {
    let tournamentSize = 3;
  
    const shuffled = population.sort(() => 0.5 - Math.random());
    let fight = shuffled.slice(0, tournamentSize);

    fight = fight.sort((a, b) => b.fitness - a.fitness);
    return fight[0];
  },

  RANDOM: population => {
    let index = getRandomInt(population.length);
    return population[index];
  },

  BOLTZMANN_TOURNAMENT: population => {

  }
});

const crossOverMethodology = Object.freeze({
  ONE_POINT: (parentOne, parentTwo) => {
    if (typeof parentOne !== "object" || typeof parentTwo !== "object" ) return;
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
    for(let i = 0; i < parentOne.genes.length; ++i){
      arr.push(i);
    }  

    const shuffled = arr.sort( () => 0.5 - Math.random());

    
    let i0 = shuffled[0];
    let i1 = shuffled[1];

    let twoRandom = [i0,i1].sort();

    // Two point cross over
    // There is a smaller and bigger
    let c1 = parentOne.copy();
    let c2 = parentTwo.copy();

    let splice = c1.genes.slice(twoRandom[0], twoRandom[1]);
    


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
  }
});

class GeneticAlgorithm {
  constructor(
    seedData,
    populationSize = 50,
    generations = 100,
    crossOverProbability = 0.7,
    mutationProbability = 0.6,
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

  setFitnessFunction(fitness) {
    this.fitnessFunction = fitness;
  }

  setSelectionFunction(selection) {
    this.selectionFunction = selection;
  }

  setCrossOverMethodology(crossOver) {
    this.crossOverMethodology = crossOver;
  }

  createIndividual(seedData) {
    let individual = [];
    let length = Object.keys(seedData).length;
    for (let i = 0; i < length; i++) {
      individual[i] = Math.floor(Math.random() * 2);
    }
    return individual;
  }

  mutate(individual) {
    // Reverse the bit of a random index in an individual.
    let index = Math.floor(Math.random() * (individual.genes.length - 0) + 0);
    let random = getRandomInt(2);
    individual.genes[index] = random;
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

    while (newPopulation.length < this.populationSize) {
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
        childOne = parentOne.copy();
        childTwo = parentTwo.copy();
        this.mutate(childOne);
        this.mutate(childTwo);
      }

      newPopulation.push(childOne);
      newPopulation.push(childTwo);

      if (this.elitism) {
        newPopulation[0] = elite;
      }
      this.currentGeneration = newPopulation;
      this.calculatePopulationFitness();
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
let currentFitness = (individual, data) => {
  let fitness = 0;
  const result = individual.filter(i => i === 1).length;
  const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);

  if (result <= 5) {
    let zipped = zip(individual, data);
    for (let i = 0; i < zipped.length; ++i) {
      if (zipped[i][0] == 1) fitness += zipped[i][1];
    }

    if (fitness > 100) return 0;
  }
  return fitness;
};

let data = {
  0: 1,
  1: 58,
  2: 3,
  3: 2,
  4: 4,
  5: 34,
  6: 1,
  7: 2,
  8: 3,
  9: 4,
  10: 11,
  11: 66
};

let grayCoder = data => {};

const ga = new GeneticAlgorithm(data);
ga.setSelectionFunction(selections.RANDOM);
ga.setFitnessFunction(currentFitness);
ga.setCrossOverMethodology(crossOverMethodology.ONE_POINT);
ga.run();

let best = ga.bestIndividual();
console.log(best);

console.log(ga.currentGeneration);
//console.log(ga.bestIndividual());
