import client from '../connections/elasticsearch-axios.js';

/**
 * (1) View Cluster Health
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-health.html
 */
const { data: cluster_health } = await client.get('/_cluster/health');
console.log(cluster_health);
