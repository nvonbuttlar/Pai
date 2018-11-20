

module.exports = function(knex) {

  return {
    getUsersConnectionsById(id) { 
      return knex
      .select('users.id', 'users.first_name', 'users.profile_picture')
      .from('connections')
      .innerJoin('users', function() {
        this.on('users.id', '=', 'connections.first_user_id').orOn('users.id', '=', 'connections.second_user_id')
      })
      .where(function() {
        this.where('connections.first_user_id', id).orWhere('connections.second_user_id', id)
      })
      .andWhere('users.id', '!=', id);
    },

    deleteConnectionById(id) {
      return knex('connections')  
      .where('id', id)
      .update({
        'is_connected': false
      })
      .then()
    },

    getUsersProfileById(id) {
      return knex('users')
      .where("id", id)
      .then()
    },

    getPersonalProfileNuggetsById(id){
      return knex('nuggets')
      .innerJoin('questions','nuggets.question_id', 'questions.id')
      .select('question', 'answer')
      .where('user_id', id)
      .then();
    },

    getNuggetsForConnectionsById(id) {

    },
  }
}