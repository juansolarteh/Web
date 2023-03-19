function IpInput(input) {
  this.valid = false;
  this.value = "";
  
  let ipLength = 0;
  let byteLength = 0;
  let byteSection = 1;
  let nextPointDelete = false;

  input.placeholder = "_ _ _ . _ _ _ . _ _ _ . _ _ _";

  input.addEventListener("input", ($event) => {
    const value = $event.target.value;

    if (value.length < ipLength) {
      if (nextPointDelete) handlePointDelete(value);
      handleCharacterDelete(input.value);
      this.value = input.value;
      if (byteLength == 0) this.valid = false;
      return;
    }

    if (input.selectionStart - 1 != ipLength) {
      input.value = removeCharacter(value, input.selectionStart - 1)
      return
    }

    if (!isValidCharacter(value[value.length - 1])) {
      input.value = removeLastCharacter(value);
      return;
    }

    if (byteSection == 4 && byteLength == 3) {
      input.value = removeLastCharacter(value);
      return;
    }

    this.value = input.value;
    if (value[value.length - 1] == ".") return handlePointWrite();
    handleCharacterWrite();

    if (byteLength == 0 && byteSection != 1) writePoint();

    if (byteSection == 4 && byteLength > 0) this.valid = true;
  });

  const isValidCharacter = (character) => {
    return Number(character) ||
      (character == "0" && byteLength != 0) ||
      (character == "." && byteLength != 0 && byteSection != 4)
      ? true
      : false;
  };

  const removeLastCharacter = (value) => {
    return value.slice(0, value.length - 1);
  };

  const removeCharacter = (value, position) => {
    const aux = value.slice(0, position);
    return aux + value.slice(position + 1);
  };

  const handleCharacterDelete = (value) => {
    ipLength -= 1;
    byteLength -= 1;
    if (byteLength < 1) {
      byteLength = value.split(".")[byteSection - 1].length;
    }
    if (value[value.length - 1] == ".") nextPointDelete = true;
  };

  const handlePointDelete = (value) => {
    input.value = removeLastCharacter(value);
    ipLength -= 1;
    byteSection -= 1;
    nextPointDelete = false;
  };

  const handleCharacterWrite = () => {
    ipLength += 1;
    byteLength += 1;
    if (byteLength == 3 && byteSection < 4) {
      byteSection += 1;
      byteLength = 0;
    }
    nextPointDelete = false;
  };

  const handlePointWrite = () => {
    byteSection += 1;
    ipLength += 1;
    byteLength = 0;
    nextPointDelete = true;
  };

  const writePoint = () => {
    input.value += ".";
    this.value += ".";
    ipLength += 1;
    nextPointDelete = true;
  };
}
