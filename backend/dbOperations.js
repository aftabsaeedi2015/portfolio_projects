const User = require('./User');
const Post = require('./Post')

async function add_user(user) {
  try {
    const user_added = new User({
      username: user.username,
      password: user.password,
      name: user.name,
      classes: user.classes,
      plan: user.plan,
      id_admin: user.is_admin
    });

    await user_added.save();
    return user_added;
  } catch (err) {
    return err.message;
  }
}
async function get_all_users() {
  try {
    const result = await User.find({});
    return result;
  } catch (err) {
    return err.message;
  }
}
async function get_user_info(id) {
  try {
    const result = await User.find({'_id': id});
    return result;
  } catch (err) {
    return err.message;
  }
}

async function signup_user(user_info){
  try {
    console.log('dboperations')
    console.log(user_info)
    const user = new User(user_info)
    await user.save()
    return user
  } catch (err) {
    return err.message

  }

}

async function login_user(credentials){
    const result = await User.find(credentials)
    return result

}

async function join_class(user_id,class_selected,joining_date){
    const new_class = {
        'class':class_selected,
        'start_date': joining_date
    }
    const user = await User.findOne({'_id':user_id})
    user.classes.push(new_class)
    await user.save()
    return user

}
async function buy_plan(user_id,membership_tier,joining_date){
    const new_membership_tier = {
        'tier':membership_tier,
        'start_date': joining_date
    }
    const user = await User.findOne({'_id':user_id})
    user.plan = new_membership_tier
    await user.save()
    return user
}
async function get_all_posts(){
  const result = await Post.find({});
  return result;
}

async function get_post(id){
  const result = await Post.find({_id: id})
  return result
}

module.exports = {
  get_all_users,
  add_user,
  login_user,
  join_class,
  buy_plan,
  get_user_info,
  get_all_posts,
  get_post,
  signup_user
};
