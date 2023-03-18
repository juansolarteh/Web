function IpInput(input) {
  this.ipLength = 0;
  this.byteLength = 0;
  this.byteSection = 1;
  this.nextPointDelete = false;
  this.valid = false;
  this.value = ""

  input.placeholder = "_ _ _ . _ _ _ . _ _ _ . _ _ _"

  input.addEventListener("input", ($event) => {
    const value = $event.target.value;

    if (value.length < this.ipLength) {
      if (this.nextPointDelete) handlePointDelete(value);
      handleCharacterDelete(input.value);
      this.value = input.value
      if (this.byteLength == 0) this.valid = false;
      return;
    }

    if (!isValidCharacter(value[value.length - 1])) {
      input.value = removeLastCharacter(value);
      return;
    }

    if (this.byteSection == 4 && this.byteLength == 3) {
      input.value = removeLastCharacter(value);
      return;
    }

    this.value = input.value
    if (value[value.length - 1] == ".") return handlePointWrite();
    handleCharacterWrite();

    if (this.byteLength == 0 && this.byteSection != 1) writePoint();

    if (this.byteSection == 4 && this.byteLength > 0) this.valid = true;
  });

  const isValidCharacter = (character) => {
    return Number(character) ||
      (character == "0" && this.byteLength != 0) ||
      (character == "." && this.byteLength != 0 && this.byteSection != 4)
      ? true
      : false;
  };

  const removeLastCharacter = (value) => {
    return value.slice(0, value.length - 1);
  }

  const handleCharacterDelete = (value) => {
    this.ipLength -= 1;
    this.byteLength -= 1;
    if (this.byteLength < 1) {
      this.byteLength = value.split(".")[this.byteSection - 1].length;
    }
    if (value[value.length - 1] == ".") this.nextPointDelete = true;
  }

  const handlePointDelete = (value) => {
    input.value = removeLastCharacter(value);
    this.ipLength -= 1;
    this.byteSection -= 1;
    this.nextPointDelete = false;
  }

  const handleCharacterWrite = () => {
    this.ipLength += 1;
    this.byteLength += 1;
    if (this.byteLength == 3 && this.byteSection < 4) {
      this.byteSection += 1;
      this.byteLength = 0;
    }
    this.nextPointDelete = false;
  }

  const handlePointWrite = () => {
    this.byteSection += 1;
    this.ipLength += 1;
    this.byteLength = 0;
    this.nextPointDelete = true;
  }

  const writePoint = () => {
    input.value += ".";
    this.value += "."
    this.ipLength += 1;
    this.nextPointDelete = true;
  }
}
