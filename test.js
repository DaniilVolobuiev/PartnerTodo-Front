function qwert(results) {
  const fp = results.filter((obj) => obj === 1);
  const sp = results.filter((obj) => obj === 2);
  console.log(fp, sp);
}
qwert([1, 1, 1, 2, 2]);
