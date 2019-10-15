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

class GeneticAlgorithm {
  constructor(
    seedData,
    populationSize = 20,
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
    this.mutationProbability = mutationProbability;
    this.elitism = elitism;
    this.maximiseFitness = maximiseFitness;

    this.currentGeneration = [];

    this.fitnessFunction = undefined;
    this.tournamentSize = this.populationSize / 10;
  }

  tournamentSelection(population) {
    if (this.tournamentSize == 0) {
      this.tournamentSize = 2;
    }
 
    const shuffled = population.sort(() => 0.5 - Math.random());
    let fight = shuffled.slice(0, this.tournamentSize);
    fight = fight.sort((a, b) => b.fitness - a.fitness);
    return fight[0];
  }

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
    let c2 = new Chromosome(childTwo);

    return [c1, c2];
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
      individual.fitness = fitness(individual.genes, this.seedData);
    }
  }

  randomSelection(population) {
    let index = getRandomInt(population.length);
    return population[index];
  }

  rankPopulation() {
    this.currentGeneration.sort((a, b) => b.fitness - a.fitness);
  }

  createNewPopulation() {
    let newPopulation = [];
    let elite = this.currentGeneration[0].copy();

    while (newPopulation.length < this.populationSize) {
      let p1 = this.tournamentSelection(this.currentGeneration);
      let p2 = this.randomSelection(this.currentGeneration);

      let parentOne = new Chromosome(p1.genes);
      let parentTwo = new Chromosome(p2.genes);

      let childOne = parentOne.copy();
      let childTwo = parentTwo.copy();

      let canCrossOver = Math.random() < this.crossOverProbability;
      let canMutate = Math.random() < this.mutationProbability;

      if (canCrossOver) {
        let children = this.crossOver(parentOne, parentTwo);
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
      //console.log(elite);
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

let old = (individual, data) => {
  let fitness = 0;
  fitness =
    Math.abs(individual[0] - 1) +
    Math.abs(individual[1] - 2) +
    Math.abs(individual[2] - 3) +
    Math.abs(individual[3] - 4);
  return 26 * 4 - fitness;
};
// Fitness function returns the value.
let fitness = (individual, data) => {
  let fitness = 0;

  const result = individual.filter(i => i === 1).length;

  if (result == 3) {
    for (let i = 0; i < individual.length; i++) {
      individual[i] == 1 ? (fitness += data[i]) : (fitness += 0);
    }

    if (fitness > 100) return 0;
  }

  return fitness;
};

let data = {
  0: 5,
  1: 10,
  2: 50,
  3: 2
};

const ga = new GeneticAlgorithm(data);

ga.createFirstGeneration();
ga.createNextGeneration();
//console.log(ga.currentGeneration);
ga.run();

let best = ga.bestIndividual();

console.log(best);
console.log(ga.currentGeneration);
