export default ExeculteQuery = (sql, params = []) => new Promise((resolve, reject) => {
  db.transaction((trans) => {
      trans.executeSql(sql, params, (trans, results) => {
          resolve(results)
      },
          (error) => {
              reject(error)
          }
      )
  })
})