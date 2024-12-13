import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Section from './Section'; // Assurez-vous que le chemin est correct

const ComparisonTable = () => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg mx-auto w-11/12 md:w-3/4 lg:w-2/3">
      <p className="text-center text-lg mb-6">
        Des heures voire des jours passés à éditer de longues vidéos
      </p>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Before SendShort */}
        <div className="flex-1  p-4 rounded-lg">
          <h3 className="text-center text-xl mb-4">Before SendShort</h3>
          <Section className="mb-4" crosses>
            <li className="flex items-center">
              <span className="mr-2">X</span>
              Des heures voire des jours passés à éditer de longues vidéos
            </li>
          </Section>
          <Section className="mb-4" crosses>
            <li className="flex items-center">
              <span className="mr-2">X</span>
              Coûteux : nécessite des monteurs vidéo ou une équipe dédiée qui peuvent facilement coûter plus de 3 000 $ par mois
            </li>
          </Section>
          <Section className="mb-4" crosses>
            <li className="flex items-center">
              <span className="mr-2">X</span>
              Nécessite un script manuel, des voix off et une recherche d'images
            </li>
          </Section>
          <Section className="mb-4" crosses>
            <li className="flex items-center">
              <span className="mr-2">X</span>
              Passez des heures à rédiger et à formater manuellement des sous-titres
            </li>
          </Section>
          <Section className="mb-4" crosses>
            <li className="flex items-center">
              <span className="mr-2">X</span>
              Traduction manuelle nécessaire pour chaque langue
            </li>
          </Section>
          <Section className="mb-4" crosses>
            <li className="flex items-center">
              <span className="mr-2">X</span>
              Manuel, plateforme par plateforme
            </li>
          </Section>
        </div>
        
        {/* After SendShort */}
        <div className="flex-1 bg-purple-800 p-4 rounded-lg">
          <h3 className="text-center text-xl mb-4">After SendShort</h3>
          <Section className="mb-4" crosses>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-400" />
              Générez plus de 10 vidéos courtes en quelques minutes, la plupart du temps de manière automatisée
            </li>
          </Section>
          <Section className="mb-4" crosses>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-400" />
              Obtenez l'IA en équipe qui travaille 24h/24 et 7j/7 pour seulement 19 $/mois
            </li>
          </Section>
          <Section className="mb-4" crosses>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-400" />
              Histoires, voix off et images d'arrière-plan générées par l'IA
            </li>
          </Section>
          <Section className="mb-4" crosses>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-400" />
              Sous-titres automatiques avec plus de 10 styles personnalisables et prise en charge multilingue en quelques minutes
            </li>
          </Section>
          <Section className="mb-4" crosses>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-400" />
              Traduisez automatiquement les sous-titres dans plus de 30 langues instantanément
            </li>
          </Section>
          <Section className="mb-4" crosses>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-400" />
              Planifiez et publiez automatiquement sur plus de 10 plateformes
            </li>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
