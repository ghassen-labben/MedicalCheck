// doctor.model.ts
export class Doctor {
    Nom: string;
    Prénom: string;
    "Spécialité médicale": string;
    "Adresse du cabinet": string;
    "Numéro de téléphone du cabinet": string;
    latitude: number;
    longitude: number;
    "Liste des patients traités": string[]; // Assuming it's an array of patient IDs
    "Liste des réunions planifiées": string[]; // Assuming it's an array of meeting IDs
    "Liste des ordonnances prescrites": string[]; // Assuming it's an array of prescription IDs
  
    constructor(data: any) {
      this.Nom = data.Nom || '';
      this.Prénom = data.Prénom || '';
      this["Spécialité médicale"] = data["Spécialité médicale"] || '';
      this["Adresse du cabinet"] = data["Adresse du cabinet"] || '';
      this["Numéro de téléphone du cabinet"] = data["Numéro de téléphone du cabinet"] || '';
      this.latitude = data.latitude || 0;
      this.longitude = data.longitude || 0;
      this["Liste des patients traités"] = data["Liste des patients traités"] || [];
      this["Liste des réunions planifiées"] = data["Liste des réunions planifiées"] || [];
      this["Liste des ordonnances prescrites"] = data["Liste des ordonnances prescrites"] || [];
    }
  }
  