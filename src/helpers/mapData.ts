const types = (types: string[]): object[] =>
  types.map(type => ({ name: type }));

const steps = (steps: { steps: any }[]): string[][] =>
  steps.map(({ steps }) => steps.map(({ step }: { step: string }) => step));

function mapData(object: object): object[] {
  const recipeInfo = Array.isArray(object) ? object : [object];
  return (
    object &&
    recipeInfo.map(recipe => {
      return {
        id: recipe?.id,
        name: recipe?.title,
        image: recipe?.image,
        summary: recipe?.summary,
        types: types(recipe?.diets),
        dishTypes: recipe?.dishTypes,
        healthScore: recipe?.healthScore,
        steps: steps(recipe?.analyzedInstructions).flat()
      };
    })
  );
}

export default mapData;
