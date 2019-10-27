public class SwitchTest {

    
    public static void main(String[] args) {

        SwitchTest st = new SwitchTest();
        
        int max = 50;
        StringBuilder sb = new StringBuilder();

        for(int i = 1; i < max; ++i){
            sb.append(st.determineFizzOrBuzz(i));
            sb.append(System.lineSeparator());
        }

        System.out.println(sb);
    }

    public String determineFizzOrBuzz(int value) {
        boolean mod3 = value % 3 == 0? true : false;
        boolean mod5 = value % 5 == 0? true: false;

        if(mod3 && mod5)
            return "FIZZBUZZ";
        if(mod3)
            return "FIZZ";
        if(mod5)
            return "BUZZ";    
            
        return value + "";

    }
}