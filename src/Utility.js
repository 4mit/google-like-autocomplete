export default function filterText(options, userInput) {
  const filteredOptions = options.filter((optionName) => {
    let foundIn = [];
    if (optionName.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1) {
      foundIn.push("Item found in Name");
    }
    if (
      optionName.address.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    ) {
      foundIn.push("Item found in Address");
    }
    if (optionName.id.toLowerCase().indexOf(userInput.toLowerCase()) > -1) {
      foundIn.push("Item found in id");
    }
    if (
      optionName.items.join("").toLowerCase().indexOf(userInput.toLowerCase()) >
      -1
    ) {
      foundIn.push("Item found in items");
    }
    if (
      optionName.pincode.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    ) {
      foundIn.push("Item found in Pincode");
    }

    optionName["foundIn"] = foundIn;
    return foundIn.length ? true : false;
  });

  return filteredOptions;
}
