// ==================== GuitarSpec ====================
class GuitarSpec { 
  constructor(builder, model, type, backWood, topWood) {
    this.builder = builder;
    this.model = model;
    this.type = type;
    this.backWood = backWood;
    this.topWood = topWood;
  }

  getBuilder() {
    return this.builder;
  }

  getModel() {
    return this.model;
  }

  getType() {
    return this.type;
  }

  getBackWood() {
    return this.backWood;
  }

  getTopWood() {
    return this.topWood;
  }

  // untuk mencocokkan spesifikasi saat pencarian
  matches(otherSpec) {
    if (otherSpec.builder && this.builder !== otherSpec.builder) return false;
    if (otherSpec.model && this.model.toLowerCase() !== otherSpec.model.toLowerCase()) return false;
    if (otherSpec.type && this.type !== otherSpec.type) return false;
    if (otherSpec.backWood && this.backWood !== otherSpec.backWood) return false;
    if (otherSpec.topWood && this.topWood !== otherSpec.topWood) return false;
    return true;
  }
}

// ==================== Guitar ====================
class Guitar { 
  constructor(serialNumber, price, spec) {
    this.serialNumber = serialNumber;
    this.price = price;
    this.spec = spec; // Object GuitarSpec
  }

  getSerialNumber() {
    return this.serialNumber;
  }

  getPrice() {
    return this.price;
  }

  setPrice(price) {
    this.price = price;
  }

  getSpec() {
    return this.spec;
  }
}

// ==================== Inventory ====================
class Inventory {
  constructor() {
    this.guitars = [];
  }

  addGuitar(serialNumber, price, spec) {
    const guitar = new Guitar(serialNumber, price, spec);
    this.guitars.push(guitar);
  }

  search(searchSpec) {
    const result = [];
    for (const guitar of this.guitars) {
      if (guitar.getSpec().matches(searchSpec)) {
        result.push(guitar);
      }
    }
    return result;
  }
}

// ==================== Contoh Penggunaan ====================
const inventory = new Inventory();

// tambah gitar ke inventory
inventory.addGuitar(
  "SN001",
  15000000,
  new GuitarSpec("Fender", "Stratocaster", "Electric", "Alder", "Maple")
);

inventory.addGuitar(
  "SN002",
  18000000,
  new GuitarSpec("Gibson", "Les Paul", "Electric", "Mahogany", "Maple")
);

// client ingin mencari gitar
const searchSpec = new GuitarSpec("Fender", "Stratocaster", "Electric", null, null);

// lakukan pencarian
const results = inventory.search(searchSpec);

// tampilkan hasil
console.log("Hasil Pencarian:");
for (const guitar of results) {
  console.log("----------------------");
  console.log("Serial:", guitar.getSerialNumber());
  console.log("Harga:", guitar.getPrice());
  console.log("Model:", guitar.getSpec().getModel());
}
