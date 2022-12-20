export default class MainMap
{
    map!: Phaser.Tilemaps.MapData; 

    constructor(scene: Phaser.Scene)
    {

        const map = scene.make.tilemap({ key: 'axoltopia_main' });
        const terrain = map.addTilesetImage('Terrain', 'terrain');
        const plantLife = map.addTilesetImage('Plant Life', 'plant_life');

        // Add layers
        const water = map.createLayer('Water', terrain);
           water.setCollisionByProperty({ collision: true })
        map.createLayer('Water Shadows', terrain); 
        map.createLayer('Water Effects', terrain);
        const sand = map.createLayer('Sand', terrain);
            sand.setCollisionByProperty({ collision: true })
        const land = map.createLayer('Land', terrain);
            land.setCollisionByProperty({ collision: true })
        map.createLayer('Land Overlay', terrain); 
        map.createLayer('Land Shadows', terrain); 

        map.createLayer('Border', plantLife)
            
        
  

        // Convert Tiled tiles into Matter tiles (to apply new physics)
        scene.matter.world.convertTilemapLayer(water);
        scene.matter.world.convertTilemapLayer(sand);
        scene.matter.world.convertTilemapLayer(land); 

    // Set bounds
        scene.cameras.main.setBounds(0, 0, 1900, 1600) // 992, 800 // 1600 1600 now
        scene.matter.world.setBounds(0, -5, 1600, 1600) // 1005, 810
    }
}