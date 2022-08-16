import client from '../connections/elasticsearch-node.js';
/**
 * Github - https://github.com/elastic/elasticsearch-js
 */

/**
 * (1) View Cluster Health
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-health.html
 */
const cluster_health = await client.cluster.health({
  wait_for_status: 'yellow',
  timeout: '50s',
});
// console.log(cluster_health);

/**
 * (2) View Node Stats
 * https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-nodes-stats.html
 */
const nodes_stats = await client.nodes.stats();
// console.log(nodes_stats);

/**
 * Create Document and assign Index (creates Index if Index doesn't exist)
 *
 */

// const index = await client.index({
//   index: 'fruits',
//   document: {
//     name: 'Apple',
//     color: 'red',
//     climate: 'cold',
//     price: '50.00',
//   },
// });
// console.log(index);
