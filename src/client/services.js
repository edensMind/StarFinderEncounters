const getAbilityScoreModifier = (score) => {
    var mod = Math.floor(( score - 10 ) / 2 )
    return mod;
}