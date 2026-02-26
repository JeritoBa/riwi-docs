import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Step-By-Step Transparency',
    Svg: require('@site/static/img/undraw_food_app.svg').default,
    description: (
      <>
        Find the documentation of various proyects what I have
        developed in all my developer career.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_focused_dev.svg').default,
    description: (
      <>
        Feel sure and save with our work. I delivered the proyects
        of my clients in less than the deadline delivery date.
      </>
    ),
  },
  {
    title: 'Continuous Innovation',
    Svg: require('@site/static/img/undraw_online_shopping.svg').default,
    description: (
      <>
        Love to face new challenges and proyects harder, that impact
        as a good way to the society.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={`${clsx('col col--3', styles.feature)}`}>
      <div className="container">
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.featuresTitle}>Find Here:</h2>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
