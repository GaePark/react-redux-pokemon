export interface PokeDBTypes {
  abilities: abilitiesTypes[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: formsTypes[];
  game_indices: game_indicesTypes[];
  height: number;
  held_items: held_itemsTypes[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: movesTypes[];
  name: string;
  order: number;
  past_abilities: any;
  past_types: any;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: {
      dream_world: {
        front_default: string;
        front_female: string;
      };
      home: {
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
      };
      ["official-artwork"]: {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: string;
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
      };
    };
    versions: any;
  };
  stats: statsTypes[];
  types: typesTypes[];
  weight: number;
}

interface abilitiesTypes {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface formsTypes {
  name: string;
  url: string;
}

interface game_indicesTypes {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface held_itemsTypes {
  item: {
    name: string;
    url: string;
  };
  version_details: held_items_versionTypes[];
}

interface held_items_versionTypes {
  rarity: number;
  version: {
    name: string;
    url: string;
  };
}

interface movesTypes {
  move: {
    name: string;
    url: string;
  };
  version_group_details: version_group_detailsTypes[];
}

interface version_group_detailsTypes {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}

export interface statsTypes {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface typesTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
