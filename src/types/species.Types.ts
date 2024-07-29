export {};

export interface speciesTypes {
  base_happiness: number;
  capture_rate: number;
  color: {
    name: string;
    url: string;
  };
  egg_groups: egg_groupsTypes[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: {
    name: string;
    url: string;
  };
  flavor_text_entries: flavor_text_entriesTypes[];
  form_descriptions: form_descriptionsTypes[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: generaTypes[];
  generation: {
    name: string;
    url: string;
  };
  growth_rate: {
    name: string;
    url: string;
  };
  habitat: any;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: namesTypes[];
  order: number;
  pal_park_encounters: any;
  pokedex_number: pokedex_numberTypes[];
  shape: {
    name: string;
    url: string;
  };
  varieties: varietiesTypes[];
}

interface egg_groupsTypes {
  name: string;
  url: string;
}

export interface flavor_text_entriesTypes {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
}
interface form_descriptionsTypes {
  description: string;
  language: {
    name: string;
    url: string;
  };
}

export interface generaTypes {
  genus: string;
  language: {
    name: string;
    url: string;
  };
}

interface namesTypes {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

interface pokedex_numberTypes {
  entry_number: number;
  pokedex: {
    name: string;
    url: string;
  };
}

interface varietiesTypes {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}
