export default class MainMap
{
    map: Phaser.Tilemaps.Tilemap;
    

    constructor(scene: Phaser.Scene)
    {

        this.map = scene.make.tilemap({ key: 'axoltopia_main' });
        const pixelKingdomTerrain = this.map.addTilesetImage('PixelKingdomTerrain', 'pixel_kingdom_terrain');
        const sunnySideTerrain = this.map.addTilesetImage('SunnysideTerrain', 'sunnyside_terrain')
        const plantLife = this.map.addTilesetImage('Plants', 'Plants');

        // Add layers
        const water = this.map.createLayer('Water', sunnySideTerrain);
           water.setCollisionByProperty({ collision: true })
           this.map.createLayer('Water Shadows', sunnySideTerrain); 
           this.map.createLayer('Water Effects', sunnySideTerrain);
        const sand = this.map.createLayer('Sand', sunnySideTerrain);
            sand.setCollisionByProperty({ collision: true })
        const land = this.map.createLayer('Land', sunnySideTerrain);
            land.setCollisionByProperty({ collision: true })
        const landOverlay = this.map.createLayer('Land Overlay', sunnySideTerrain); 
            landOverlay.setCollisionByProperty({ collision: true });
            this.map.createLayer('Land Shadows', sunnySideTerrain); 
            this.map.createLayer('Plants', plantLife)

            this.map.createLayer('Border', plantLife)
            
       
  

        // Convert Tiled tiles into Matter tiles (to apply new physics)
        scene.matter.world.convertTilemapLayer(water);
        scene.matter.world.convertTilemapLayer(sand);
        scene.matter.world.convertTilemapLayer(land); 
        scene.matter.world.convertTilemapLayer(landOverlay); 

    // Set bounds
        scene.cameras.main.setBounds(0, 0, 1920, 1920) // 992, 800 // 1600 1600 now
        scene.matter.world.setBounds(0, -5, 1920, 1920) // 1005, 810

        console.log(this.map.widthInPixels)
        console.log(this.map.heightInPixels); 
    }
}