import java.util.List;
import java.util.ArrayList;
//TODO: Arraylists, compareto
public class Main {
  private int internet_points;
  public boolean test(){
    System.out.println("boo!");
    return true;
  }
  public Main(int i){
    System.out.println("FOO!");
    internet_points=i;
  }
  public String toString(){
    return "Stringy! "+Integer.toString(internet_points);
  }
  public static void main(String[] args) {
    List<Main> foo = new ArrayList<Main>();
    foo.add(0,new Main(1));
    foo.add(1,new Main(2));
    Main bar = new Main(3);
    System.out.print(foo);
    return;
  }
}
