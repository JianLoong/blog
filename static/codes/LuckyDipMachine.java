import java.util.HashMap;
import java.util.Map;

public class LuckyDipMachine {
    
    private Map<Prize, Integer> inventory;

    private static LuckyDipMachine ourInstance = new LuckyDipMachine();

    public static LuckyDipMachine getInstance() {
        return ourInstance;
    }

    private LuckyDipMachine() {
        inventory = new HashMap<Prize, Integer>();
        fill();
    }

    private void fill(){
        Prize p1 = new Prize("Pillow");
        Prize p2 = new Prize("Hot Dog");
        Prize p3 = new Prize("Potato");
        Prize p4 = new Prize("Tomato");
        

        inventory.put(p1,10);
    }


    public void getRandomPrize(){
        Prize p1 = new Prize("Pillow");
        
        int amount = inventory.getOrDefault(p1, 0);
        
        inventory.putIfAbsent(p1, amount);

        return;
    }


    public int getInventorySize() {
        return inventory.size();
    }

    public static void main(String[] args) {
        LuckyDipMachine ldm = LuckyDipMachine.getInstance();

        ldm.getRandomPrize();

        System.out.println(ldm.getInventorySize());


        LuckyDipMachine ldm2= LuckyDipMachine.getInstance();

        ldm2.getRandomPrize();

        System.out.println(ldm2.getInventorySize());

    

    }

}
